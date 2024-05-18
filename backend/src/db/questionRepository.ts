import { answer, commentQuestion, question, question_tag, tag } from './schema'
import { eq, getTableColumns, sql } from 'drizzle-orm'
import { db } from '../server'
import { CreateQuestion, InsertQuestionComment, Question, QuestionTag } from './types'
import { QueryResultType } from '../utils/typeUtils'
import { UpdateQuestionRequest, UUID } from '../shared/types'

export const createQuestionQuery = async (createQuestion: CreateQuestion) => {
    const questionColumns = getTableColumns(question)
    return await db.transaction(async (tx) => {
        const newQuestion: Question = (
            await tx.insert(question).values(createQuestion.question).returning(questionColumns)
        )[0]

        //Insert new Tags, if already exists, do nothing
        if (createQuestion.tags.length > 0) {
            await tx
                .insert(tag)
                .values(createQuestion.tags)
                .onConflictDoNothing({ target: tag.name })

            const newTags = await tx.query.tag
                .findMany({
                    where: (tag, { inArray }) =>
                        inArray(
                            tag.name,
                            createQuestion.tags.map((tag) => tag.name),
                        ),
                })
                .execute()
            const questionTags: QuestionTag[] = newTags.map((tag) => {
                return { questionId: newQuestion.id, tagId: tag.id }
            })
            await tx.insert(question_tag).values(questionTags)
        }

        return newQuestion
    })
}

export const updateQuestionQuery = async (updateQuestion: CreateQuestion, questionId: UUID) => {
    await db.transaction(async (tx) => {
        console.log(updateQuestion)
        await tx
            .update(question)
            .set({
                title: updateQuestion.question.title,
                content: updateQuestion.question.content,
                lastEditedAt: new Date(),
            })
            .where(eq(question.id, questionId))
            .execute()

        //Insert new Tags, if already exists, do nothing
        if (updateQuestion.tags.length > 0) {
            await tx
                .insert(tag)
                .values(updateQuestion.tags)
                .onConflictDoNothing({ target: tag.name })

            const newTags = await tx.query.tag
                .findMany({
                    where: (tag, { inArray }) =>
                        inArray(
                            tag.name,
                            updateQuestion.tags.map((tag) => tag.name),
                        ),
                })
                .execute()
            const questionTags: QuestionTag[] = newTags.map((tag) => {
                return { questionId: questionId, tagId: tag.id }
            })
            await tx.delete(question_tag).where(eq(question_tag.questionId, questionId))
            await tx.insert(question_tag).values(questionTags)
        }
    })
}

export const deleteQuestionQuery = async (questionId: UUID) => {
    await db.delete(question).where(eq(question.id, questionId)).execute()
}

const questionsPreviewQuery = (query: string) =>
    db.query.question.findMany({
        where: query
            ? sql`to_tsvector('english', ${question.title} || ' ' || ${question.content}) @@ plainto_tsquery('english', ${query})`
            : undefined,
        with: {
            user: {
                columns: {
                    password: false,
                },
            },
            tags: {
                with: {
                    tag: true,
                },
            },
            votes: true,
            answers: {
                with: {
                    ratings: true,
                },
            },
        },
    })
export type QuestionPreviewResult = QueryResultType<typeof questionsPreviewQuery>[number]
export const queryQuestions = async (query: string) => {
    return await questionsPreviewQuery(query).execute()
}

const questionQueryPartial = (id: UUID) =>
    db.query.question.findFirst({
        with: {
            user: {
                columns: {
                    password: false,
                },
            },
            tags: {
                with: {
                    tag: true,
                },
            },
            votes: true,
            comments: {
                with: {
                    user: {
                        columns: {
                            password: false,
                        },
                    },
                },
            },
        },
        where: (question, { eq }) => eq(question.id, id),
    })

const answerQueryPartial = (id: UUID) =>
    db.query.answer.findMany({
        with: {
            user: {
                columns: {
                    password: false,
                },
            },
            votes: true,
            ratings: true,
            comments: {
                with: {
                    user: {
                        columns: {
                            password: false,
                        },
                    },
                },
            },
        },
        where: (answer, { eq }) => eq(answer.questionId, id),
    })

type QuestionQueryResultPartial = QueryResultType<typeof questionQueryPartial>
type AnswerQueryResultPartial = QueryResultType<typeof answerQueryPartial>

export type QuestionQueryResult = QuestionQueryResultPartial & { answers: AnswerQueryResultPartial }

export const queryQuestionById = async (id: UUID): Promise<QuestionQueryResult> => {
    const question = await questionQueryPartial(id).execute()
    //ToDo use custom Error
    if (!question) {
        throw new Error('Kein Anschluss unter dieser ID')
    }
    const answers = await answerQueryPartial(id).execute()
    return {
        ...question,
        answers: answers,
    }
}

export const createQuestionCommentQuery = async (comment: InsertQuestionComment) => {
    await db.insert(commentQuestion).values(comment).execute()
}
