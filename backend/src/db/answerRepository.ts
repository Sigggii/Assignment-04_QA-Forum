import { InsertAnswer, InsertAnswerComment } from './types'
import { db } from '../server'
import { answer, commentAnswer, question } from './schema'
import { eq } from 'drizzle-orm'
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
