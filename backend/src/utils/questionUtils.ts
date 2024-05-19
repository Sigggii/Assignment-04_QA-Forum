import { QuestionPreviewResult, QuestionQueryResult } from '../db/questionRepository'

export const calculateAnswerRating = (
    ratings: QuestionPreviewResult['answers'][number]['ratings'],
) => {
    return calculateAverage(ratings.map((rating) => rating.rating))
}

/**
 * Calculate the top answer rating
 *
 * The top answer rating is the highest average rating of all answers
 *
 * @param answers all answers of a question
 * @returns top answer rating, or -1 if no answers / ratings are present
 */
export const calculateTopAnswerRating = (answers: QuestionPreviewResult['answers']) => {
    const ratings = answers.map((answer) => answer.ratings).map(calculateAnswerRating)

    if (ratings.length === 0) return -1

    return Math.max(...ratings)
}

/**
 * Calculate the score of a question
 *
 * @returns score of the question
 * @param votesQuestion
 */
export const calculateQuestionScore = (votesQuestion: QuestionPreviewResult['votes']) => {
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
    votesAnswer: QuestionQueryResult['answers'][number]['votes'],
) => {
    const upvotes = votesAnswer.filter((votes) => votes.upvote).length
    const downvotes = votesAnswer.filter((vote) => !vote.upvote).length

    return upvotes - downvotes
}

export const mapQuestionPreviewResult = (data: QuestionPreviewResult[]) => {
    return data.map((question) => {
        const topAnswerRating = calculateTopAnswerRating(question.answers)
        const score = calculateQuestionScore(question.votes)

        return {
            id: question.id,
            authorId: question.authorId,
            content: question.content,
            createdAt: question.createdAt,
            lastEditedAt: question.lastEditedAt,
            title: question.title,

            user: question.user,
            tags: question.tags.map((tag) => tag.tag),

            topAnswerRating: topAnswerRating,
            answerCount: question.answers.length,
            score: score,
        }
    })
}

/**
 * Calculate the average of numbers
 * @param numbers average, or -1 if array was empty
 */
const calculateAverage = (numbers: number[]) => {
    if (numbers.length === 0) return -1
    return numbers.reduce((sum, currentValue) => sum + currentValue, 0) / numbers.length
}
