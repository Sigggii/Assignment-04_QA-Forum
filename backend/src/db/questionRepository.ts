import { commentQuestion, question, question_tag, tag, votesAnswer, votesQuestion } from './schema'
import { and, eq, getTableColumns, sql } from 'drizzle-orm'
import { db } from '../server'
import {
    CreateQuestion,
    InsertQuestionComment,
    InsertVoteQuestion,
    Question,
    QuestionTag,
} from './types'
import { QueryResultType } from '../utils/typeUtils'
import { UUID } from '../shared/types'

/**
 * Create Question Query
 *
 * @param createQuestion data for creating a question
 */
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

/**
 * Update Question Query
 *
 * @param updateQuestion data for updating a question
 * @param questionId id of the question to update
 */
export const updateQuestionQuery = async (updateQuestion: CreateQuestion, questionId: UUID) => {
    await db.transaction(async (tx) => {
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

/**
 * Delete Question Query *
 * @param questionId id of the question to delete
 */
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

/**
 * Query Questions by search query
 * @param query search query
 * @returns questions matching the query
 */
export const queryQuestions = async (query: string) => {
    return await questionsPreviewQuery(query).execute()
}

const myQuestionsPreviewQuery = (userId: UUID) =>
    db.query.question.findMany({
        where: (question, { eq }) => eq(question.authorId, userId),
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

/**
 * Query Questions by User ID
 * @param userId id of the user to query
 * @returns questions of the user
 */
export const queryMyQuestions = async (userId: UUID) => {
    return await myQuestionsPreviewQuery(userId).execute()
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

/**
 * Query Question by Id
 *
 * @param id id of the question to query
 */
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

/**
 * Create Question Comment Query
 *
 * @param comment data for creating a comment
 */
export const createQuestionCommentQuery = async (comment: InsertQuestionComment) => {
    await db.insert(commentQuestion).values(comment).execute()
}

/**
 * Update Question Comment Query
 * @param content  content of the comment
 * @param commentId id of the comment to update
 */
export const updateQuestionCommentQuery = async (
    content: InsertQuestionComment['content'],
    commentId: UUID,
) => {
    await db
        .update(commentQuestion)
        .set({ content: content })
        .where(eq(commentQuestion.id, commentId))
        .execute()
}

/**
 * Delete Question Comment Query
 *
 * @param commentId id of the comment to delete
 */
export const deleteQuestionCommentQuery = async (commentId: UUID) => {
    await db.delete(commentQuestion).where(eq(commentQuestion.id, commentId)).execute()
}

/**
 * Get Question Comment By Id Query
 *
 * @param commentId id of the comment to get
 */
export const getQuestionCommentByIdQuery = async (commentId: UUID) => {
    const commentQuestion = await db.query.commentQuestion
        .findFirst({
            where: (commentQuestion, { eq }) => eq(commentQuestion.id, commentId),
        })
        .execute()

    if (!commentQuestion) {
        throw new Error('No QuestionComment with this Id')
    }
    return commentQuestion
}

/**
 * Insert Vote Question Query
 *
 * @param voteQuestion data for creating a vote entry
 */
export const insertVoteQuestionQuery = async (voteQuestion: InsertVoteQuestion) => {
    await db
        .insert(votesQuestion)
        .values(voteQuestion)
        .onConflictDoUpdate({
            target: [votesQuestion.questionId, votesAnswer.userId],
            set: { upvote: voteQuestion.upvote },
        })
        .execute()
}

/**
 * Delete Vote Entry for a Question
 *
 * @param userId id of the user of the entry
 * @param questionId id of the question of the entry
 */
export const deleteVoteQuestionQuery = async (questionId: UUID, userId: UUID) => {
    await db
        .delete(votesQuestion)
        .where(and(eq(votesQuestion.questionId, questionId), eq(votesQuestion.userId, userId)))
}
