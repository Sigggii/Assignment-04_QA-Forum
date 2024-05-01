import { QuestionPreviewResult, QuestionQueryResult } from '../db/questionRepository'

export const calculateAnswerRating = (
    ratingAnswer: QuestionPreviewResult['answer'][number]['ratingAnswer'],
) => {
    return calculateAverage(ratingAnswer.map((rating) => rating.rating))
}

/**
 * Calculate the top answer rating
 *
 * The top answer rating is the highest average rating of all answers
 *
 * @param question question to calculate the top answer rating for
 * @returns top answer rating, or -1 if no answers / ratings are present
 */
export const calculateTopAnswerRating = (question: QuestionPreviewResult) => {
    const ratings = question.answer.map((answer) => answer.ratingAnswer).map(calculateAnswerRating)

    if (ratings.length === 0) return -1

    return Math.max(...ratings)
}

/**
 * Calculate the score of a question
 *
 * @returns score of the question
 * @param votesQuestion
 */
export const calculateQuestionScore = (votesQuestion: QuestionPreviewResult['votesQuestion']) => {
    const upvotes = votesQuestion.filter((vote) => vote.upvote).length
    const downvotes = votesQuestion.filter((vote) => !vote.upvote).length

    return upvotes - downvotes
}

/**
 * Calculate the score of a answer
 *
 * @returns score of the question
 * @param votesAnswer
 */
export const calculateAnswerScore = (
    votesAnswer: QuestionQueryResult['answers'][number]['votesAnswer'],
) => {
    const upvotes = votesAnswer.filter((votes) => votes.upvote).length
    const downvotes = votesAnswer.filter((vote) => !vote.upvote).length

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
