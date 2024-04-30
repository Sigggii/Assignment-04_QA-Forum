import { QuestionPreviewResult } from '../db/questionRepository'

/**
 * Calculate the top answer rating
 *
 * The top answer rating is the highest average rating of all answers
 *
 * @param question question to calculate the top answer rating for
 * @returns top answer rating, or -1 if no answers / ratings are present
 */
export const calculateTopAnswerRating = (question: QuestionPreviewResult) => {
    const ratings = question.answer
        .map((answer) => answer.ratingAnswer)
        .map((rating) => calculateAverage(rating.map((rating) => rating.rating)))

    if (ratings.length === 0) return -1

    return Math.max(...ratings)
}

/**
 * Calculate the score of a question
 *
 * @param question question to calculate the score for
 * @returns score of the question
 */
export const calculateScore = (question: QuestionPreviewResult) => {
    const upvotes = question.votesQuestion.filter((vote) => vote.upvote).length
    const downvotes = question.votesQuestion.filter((vote) => !vote.upvote).length

    return upvotes - downvotes
}

/**
 * Calculate the average of numbers
 * @param numbers average, or -1 if array was empty
 */
const calculateAverage = (numbers: number[]) => {
    if (numbers.length === 0) return -1
    return numbers.reduce((sum, currentValue) => sum + currentValue, 0) / numbers.length
}
