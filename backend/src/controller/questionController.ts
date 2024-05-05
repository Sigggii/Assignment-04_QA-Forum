import { Question } from '../db/types'
import {
    CreateAnswer,
    CreateAnswerCommentRequest,
    CreateQuestionCommentRequest,
    CreateQuestionRequest,
    DetailQuestion,
    QuestionPreviewData,
    UUID,
} from '../shared/types'
import {
    createQuestionCommentQuery,
    createQuestionQuery,
    queryQuestionById,
    queryQuestions,
} from '../db/questionRepository'
import {
    calculateAnswerRating,
    calculateAnswerScore,
    calculateQuestionScore,
    calculateTopAnswerRating,
} from '../utils/questionUtils'
import { createAnswerCommentQuery, createAnswerQuery } from '../db/answerRepository'

export const createQuestion = async (
    createQuestion: CreateQuestionRequest,
    authorId: Question['authorId'],
) => {
    return await createQuestionQuery({
        ...createQuestion,
        question: { ...createQuestion.question, authorId: authorId },
    })
}

export const getQuestions = async (): Promise<QuestionPreviewData[]> => {
    const data = await queryQuestions()

    return data.map((question) => {
        const topAnswerRating = calculateTopAnswerRating(question)
        const score = calculateQuestionScore(question.votesQuestion)

        return {
            id: question.id,
            authorId: question.authorId,
            content: question.content,
            createdAt: question.createdAt,
            lastEditedAt: question.lastEditedAt,
            title: question.title,

            user: question.user,
            tags: question.question_tag.map((tag) => tag.tag),

            topAnswerRating: topAnswerRating,
            answerCount: question.answer.length,
            score: score,
        }
    })
}

//ToDo check for user who makes request, if he upvoted the question or any answer
export const getQuestionById = async (id: UUID): Promise<DetailQuestion> => {
    const question = await queryQuestionById(id)

    const questionScore = calculateQuestionScore(question.votesQuestion)
    const answers = question.answers.map((answer) => {
        const answerScore = calculateAnswerScore(answer.votesAnswer)
        const averageRating = calculateAnswerRating(answer.ratingAnswer)

        return {
            ...answer,
            score: answerScore,
            rating: averageRating,
        }
    })

    return {
        id: question.id,
        authorId: question.authorId,
        content: question.content,
        createdAt: question.createdAt,
        lastEditedAt: question.lastEditedAt,
        title: question.title,

        user: question.user,
        tags: question.question_tag.map((tag) => tag.tag),
        score: questionScore,
        comments: question.commentQuestion,
        answers: answers,
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

export const createAnswer = async (
    answerContent: CreateAnswer,
    questionId: UUID,
    authorId: UUID,
) => {
    await createAnswerQuery({ ...answerContent, questionId: questionId, authorId: authorId })
}

export const createAnswerComment = async (
    comment: CreateAnswerCommentRequest,
    answerId: UUID,
    authorId: UUID,
) => {
    await createAnswerCommentQuery({ ...comment, answerId: answerId, authorId: authorId })
}
