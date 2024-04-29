import { CreateQuestion, Question } from '../db/types'
import { CreateQuestionRequest } from '../shared/types'
import { createQuestionDB } from '../db/questionRepository'

export const createQuestion = async (
    createQuestion: CreateQuestionRequest,
    authorId: Question['authorId'],
) => {
    return await createQuestionDB({
        ...createQuestion,
        question: { ...createQuestion.question, authorId: authorId },
    })
}
