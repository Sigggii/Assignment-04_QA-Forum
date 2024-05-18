import { CreateQuestion, Question } from '../db/types'
import {
    CreateAnswer,
    CreateAnswerCommentRequest,
    CreateQuestionCommentRequest,
    CreateQuestionRequest,
    CreateRatingAnswer,
    CreateVoteAnswer,
    CreateVoteQuestion,
    DetailQuestion,
    QuestionPreviewData,
    UpdateQuestionRequest,
    UUID,
} from '../shared/types'
import {
    createQuestionCommentQuery,
    createQuestionQuery,
    deleteQuestionCommentQuery,
    deleteQuestionQuery,
    deleteVoteQuestionQuery,
    insertVoteQuestionQuery,
    queryQuestionById,
    queryQuestions,
    updateQuestionCommentQuery,
    updateQuestionQuery,
} from '../db/questionRepository'
import {
    calculateAnswerRating,
    calculateAnswerScore,
    calculateQuestionScore,
    calculateTopAnswerRating,
} from '../utils/questionUtils'
import {
    createAnswerCommentQuery,
    createAnswerQuery,
    deleteAnswerCommentQuery,
    deleteAnswerQuery,
    deleteRatingAnswerQuery,
    deleteVoteAnswerQuery,
    getAnswerCommentByIdQuery,
    insertRatingAnswerQuery,
    insertVoteAnswerQuery,
    updateAnswerCommentQuery,
    updateAnswerQuery,
} from '../db/answerRepository'
import { votesAnswer } from '../db/schema'

export const createQuestion = async (
    createQuestion: CreateQuestionRequest,
    authorId: Question['authorId'],
) => {
    return await createQuestionQuery({
        ...createQuestion,
        question: { ...createQuestion.question, authorId: authorId },
    })
}

export const updateQuestion = async (
    updateQuestion: UpdateQuestionRequest,
    questionId: Question['id'],
) => {
    await updateQuestionQuery(updateQuestion, questionId)
}

export const deleteQuestion = async (questionId: string) => {
    await deleteQuestionQuery(questionId)
}

export const getQuestions = async (): Promise<QuestionPreviewData[]> => {
    const data = await queryQuestions()

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

export const getQuestionById = async (id: UUID): Promise<DetailQuestion> => {
    const question = await queryQuestionById(id)

    const questionScore = calculateQuestionScore(question.votes)
    const answers = question.answers.map((answer) => {
        const answerScore = calculateAnswerScore(answer.votes)
        const averageRating = calculateAnswerRating(answer.ratings)
        const ratingsCount = answer.ratings.length

        return {
            ...answer,
            score: answerScore,
            rating: averageRating,
            ratingsCount: ratingsCount,
        }
    })

    const sortedAnswers = answers.sort((answer1, answer2) => answer2.score - answer1.score)

    return {
        id: question.id,
        authorId: question.authorId,
        content: question.content,
        createdAt: question.createdAt,
        lastEditedAt: question.lastEditedAt,
        title: question.title,

        user: question.user,
        tags: question.tags.map((tag) => tag.tag),
        score: questionScore,
        comments: question.comments,
        answers: sortedAnswers,
    }
}

export const createQuestionComment = async (
    comment: CreateQuestionCommentRequest,
    questionId: UUID,
    authorId: UUID,
) => {
    await createQuestionCommentQuery({
        ...comment,
        questionId: questionId,
        authorId: authorId,
    })
}

export const updateQuestionComment = async (
    comment: CreateQuestionCommentRequest,
    commentId: UUID,
) => {
    await updateQuestionCommentQuery(comment.content, commentId)
}

export const deleteQuestionComment = async (commentId: UUID) => {
    await deleteQuestionCommentQuery(commentId)
}

export const createVoteQuestion = async (
    questionId: UUID,
    userId: UUID,
    voteQuestion: CreateVoteQuestion,
) => {
    if (voteQuestion.upvote !== undefined) {
        await insertVoteQuestionQuery({
            questionId: questionId,
            userId: userId,
            upvote: voteQuestion.upvote,
        })
    } else {
        await deleteVoteQuestionQuery(questionId, userId)
    }
}

export const createAnswer = async (
    answerContent: CreateAnswer,
    questionId: UUID,
    authorId: UUID,
) => {
    await createAnswerQuery({ ...answerContent, questionId: questionId, authorId: authorId })
}

export const updateAnswer = async (answerContent: CreateAnswer, answerId: UUID) => {
    await updateAnswerQuery(answerContent, answerId)
}

export const deleteAnswer = async (answerId: UUID) => {
    await deleteAnswerQuery(answerId)
}

export const createAnswerComment = async (
    comment: CreateAnswerCommentRequest,
    answerId: UUID,
    authorId: UUID,
) => {
    await createAnswerCommentQuery({ ...comment, answerId: answerId, authorId: authorId })
}

export const updateAnswerComment = async (comment: CreateAnswerCommentRequest, commentId: UUID) => {
    await updateAnswerCommentQuery(comment.content, commentId)
}

export const deleteAnswerComment = async (commentId: UUID) => {
    await deleteAnswerCommentQuery(commentId)
}

export const createVoteAnswer = async (
    answerId: UUID,
    userId: UUID,
    voteAnswer: CreateVoteAnswer,
) => {
    if (voteAnswer.upvote !== undefined) {
        await insertVoteAnswerQuery({
            answerId: answerId,
            userId: userId,
            upvote: voteAnswer.upvote,
        })
    } else {
        await deleteVoteAnswerQuery(answerId, userId)
    }
}

export const createRatingAnswer = async (
    answerId: UUID,
    userId: UUID,
    rating: CreateRatingAnswer,
) => {
    if (rating.rating) {
        await insertRatingAnswerQuery({ answerId: answerId, userId: userId, rating: rating.rating })
    } else {
        await deleteRatingAnswerQuery(answerId, userId)
    }
}
