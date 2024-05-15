import { commentQuestion, question, question_tag, tag } from './schema'
import { getTableColumns } from 'drizzle-orm'
import { db } from '../server'
import { CreateQuestion, InsertQuestionComment, Question, QuestionTag } from './types'
import { QueryResultType } from '../utils/typeUtils'
import { UUID } from '../shared/types'

export const createQuestionQuery = async (createQuestion: CreateQuestion) => {
    console.log(createQuestion)
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

const questionPreviewQuery = () =>
    db.query.question.findMany({
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
export type QuestionPreviewResult = QueryResultType<typeof questionPreviewQuery>[number]
export const queryQuestions = async () => {
    return await questionPreviewQuery().execute()
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
