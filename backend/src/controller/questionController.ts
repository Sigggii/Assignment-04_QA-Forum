import { Question } from '../db/types'
import { CreateQuestionRequest, QuestionData } from '../shared/types'
import { createQuestionDB, queryQuestions } from '../db/questionRepository'
import { calculateTopAnswerRating } from '../utils/questionUtils'

export const createQuestion = async (
    createQuestion: CreateQuestionRequest,
    authorId: Question['authorId'],
) => {
    return await createQuestionDB({
        ...createQuestion,
        question: { ...createQuestion.question, authorId: authorId },
    })
}

export const getQuestions = async (): Promise<QuestionData[]> => {
    const data = await queryQuestions()

    return data.map((question) => {
        const topAnswerRating = calculateTopAnswerRating(question.answer)

        // TODO: calculate score

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
            score: 0,
        }
    })
}
