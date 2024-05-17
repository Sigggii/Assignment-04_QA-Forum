import { UUID } from '../shared/types'
import { getUpvoteForAnswerQuery, getUpvoteForQuestionQuery } from '../db/userRepository'

export const getUpvoteForQuestion = async (userId: UUID, questionId: UUID) => {
    return await getUpvoteForQuestionQuery(userId, questionId)
}

export const getUpvoteForAnswer = async (userId: UUID, answerId: UUID) => {
    return await getUpvoteForAnswerQuery(userId, answerId)
}
