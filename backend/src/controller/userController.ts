import { UUID } from '../shared/types'
import {
    getRatingForAnswerQuery,
    getUpvoteForAnswerQuery,
    getUpvoteForQuestionQuery,
} from '../db/userRepository'

export const getUpvoteForQuestion = async (userId: UUID, questionId: UUID) => {
    return await getUpvoteForQuestionQuery(userId, questionId)
}

export const getUpvoteForAnswer = async (userId: UUID, answerId: UUID) => {
    return await getUpvoteForAnswerQuery(userId, answerId)
}

export const getRatingForAnswer = async (userId: UUID, answerId: UUID) => {
    return await getRatingForAnswerQuery(userId, answerId)
}
