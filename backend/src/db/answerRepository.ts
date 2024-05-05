import { InsertAnswer, InsertAnswerComment } from './types'
import { db } from '../server'
import { answer, commentAnswer } from './schema'

export const createAnswerQuery = async (createAnswer: InsertAnswer) => {
    await db.insert(answer).values(createAnswer).execute()
}

export const createAnswerCommentQuery = async (comment: InsertAnswerComment) => {
    await db.insert(commentAnswer).values(comment).execute()
}
