import { InsertAnswer, InsertAnswerComment, InsertRatingAnswer, InsertVoteAnswer } from './types'
import { db } from '../server'
import { answer, commentAnswer, question, ratingAnswer, votesAnswer } from './schema'
import { and, eq } from 'drizzle-orm'
import { Answer, CreateAnswer, UUID } from '../shared/types'

/**
 * Create Answer Query
 * @param createAnswer data for creating an answer
 */
export const createAnswerQuery = async (createAnswer: InsertAnswer) => {
    await db.insert(answer).values(createAnswer).execute()
}

/**
 * Update Answer Query
 * @param updateAnswer data for updating an answer
 * @param answerId id of the answer to update
 */
export const updateAnswerQuery = async (updateAnswer: CreateAnswer, answerId: UUID) => {
    await db
        .update(answer)
        .set({ content: updateAnswer.content, lastEditedAt: new Date() })
        .where(eq(answer.id, answerId))
        .execute()
}

/**
 * Delete Answer Query
 * @param answerId id of the answer to delete
 */
export const deleteAnswerQuery = async (answerId: UUID) => {
    await db.delete(answer).where(eq(answer.id, answerId)).execute()
}

/**
 * Get Answer By Id Query
 * @param id id of the answer to get
 */
export const getAnswerByIdQuery = async (id: UUID) => {
    const answer = await db.query.answer
        .findFirst({
            where: (answer, { eq }) => eq(question.id, id),
        })
        .execute()

    if (!answer) {
        throw new Error('No Answer with this Id')
    }
    return answer
}

/**
 * Create Comment for a answer
 * @param comment commentData
 */
export const createAnswerCommentQuery = async (comment: InsertAnswerComment) => {
    await db.insert(commentAnswer).values(comment).execute()
}

/**
 * Update Answer Comment Query
 * @param content content of the comment
 * @param commentId id of the comment to update
 */
export const updateAnswerCommentQuery = async (
    content: InsertAnswerComment['content'],
    commentId: UUID,
) => {
    await db
        .update(commentAnswer)
        .set({ content: content })
        .where(eq(commentAnswer.id, commentId))
        .execute()
}

/**
 * Delete Answer Comment Query
 * @param commentId id of the comment to delete
 */
export const deleteAnswerCommentQuery = async (commentId: UUID) => {
    await db.delete(commentAnswer).where(eq(commentAnswer.id, commentId)).execute()
}

/**
 * Get Answer Comment By Id Query
 * @param commentId id of the comment to get
 */
export const getAnswerCommentByIdQuery = async (commentId: UUID) => {
    const commentAnswer = await db.query.commentAnswer
        .findFirst({
            where: (commentAnswer, { eq }) => eq(commentAnswer.id, commentId),
        })
        .execute()

    if (!commentAnswer) {
        throw new Error('No AnswerComment with this Id')
    }
    return commentAnswer
}

/**
 * Insert Vote Entry for a Answer
 * @param voteAnswer data of vote entry
 */
export const insertVoteAnswerQuery = async (voteAnswer: InsertVoteAnswer) => {
    await db
        .insert(votesAnswer)
        .values(voteAnswer)
        .onConflictDoUpdate({
            target: [votesAnswer.answerId, votesAnswer.userId],
            set: { upvote: voteAnswer.upvote },
        })
        .execute()
}

/**
 * Delete Vote Entry for a Answer
 * @param answerId id of the answer
 * @param userId id of the user
 */
export const deleteVoteAnswerQuery = async (answerId: UUID, userId: UUID) => {
    await db
        .delete(votesAnswer)
        .where(and(eq(votesAnswer.answerId, answerId), eq(votesAnswer.userId, userId)))
}

/**
 * Insert Rating Entry for a Answer
 * @param rating data of rating entry
 */
export const insertRatingAnswerQuery = async (rating: InsertRatingAnswer) => {
    await db
        .insert(ratingAnswer)
        .values(rating)
        .onConflictDoUpdate({
            target: [ratingAnswer.answerId, ratingAnswer.userId],
            set: { rating: rating.rating },
        })
        .execute()
}

/**
 * Delete Rating Entry for a Answer
 * @param answerId id of the answer
 * @param userId id of the user
 */
export const deleteRatingAnswerQuery = async (answerId: UUID, userId: UUID) => {
    await db
        .delete(ratingAnswer)
        .where(and(eq(ratingAnswer.answerId, answerId), eq(ratingAnswer.userId, userId)))
}

/**
 * Approve Answer Query
 * @param answerId id of the answer to approve
 * @param isApproved boolean value to approve or disapprove the answer
 */
export const approveAnswerQuery = async (answerId: UUID, isApproved: boolean) => {
    await db.update(answer).set({ approved: isApproved }).where(eq(answer.id, answerId)).execute()
}
