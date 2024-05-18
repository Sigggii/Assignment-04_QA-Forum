import { InsertAnswer, InsertAnswerComment, InsertRatingAnswer, InsertVoteAnswer } from './types'
import { db } from '../server'
import { answer, commentAnswer, question, ratingAnswer, votesAnswer } from './schema'
import { and, eq } from 'drizzle-orm'
import { Answer, CreateAnswer, UUID } from '../shared/types'

export const createAnswerQuery = async (createAnswer: InsertAnswer) => {
    await db.insert(answer).values(createAnswer).execute()
}

export const updateAnswerQuery = async (updateAnswer: CreateAnswer, answerId: UUID) => {
    await db
        .update(answer)
        .set({ content: updateAnswer.content, lastEditedAt: new Date() })
        .where(eq(answer.id, answerId))
        .execute()
}

export const deleteAnswerQuery = async (answerId: UUID) => {
    await db.delete(answer).where(eq(answer.id, answerId)).execute()
}

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

export const createAnswerCommentQuery = async (comment: InsertAnswerComment) => {
    await db.insert(commentAnswer).values(comment).execute()
}

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

export const deleteAnswerCommentQuery = async (commentId: UUID) => {
    await db.delete(commentAnswer).where(eq(commentAnswer.id, commentId)).execute()
}

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

export const deleteVoteAnswerQuery = async (answerId: UUID, userId: UUID) => {
    await db
        .delete(votesAnswer)
        .where(and(eq(votesAnswer.answerId, answerId), eq(votesAnswer.userId, userId)))
}

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

export const deleteRatingAnswerQuery = async (answerId: UUID, userId: UUID) => {
    await db
        .delete(ratingAnswer)
        .where(and(eq(ratingAnswer.answerId, answerId), eq(ratingAnswer.userId, userId)))
}

export const approveAnswerQuery = async (answerId: UUID, isApproved: boolean) => {
    await db.update(answer).set({ approved: isApproved }).where(eq(answer.id, answerId)).execute()
}
