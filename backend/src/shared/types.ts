//shared types between frontend and backend

import { z } from 'zod'
import { InsertQuestionSchema, CreateTagSchema } from '../db/types'
import { queryQuestionById, QuestionQueryResult } from '../db/questionRepository'

export const CreateQuestionRequestSchema = z.object({
    question: InsertQuestionSchema.pick({ title: true, content: true }),
    tags: z.array(CreateTagSchema.pick({ name: true })).max(5, 'Maximum 5 Tags'),
})

export type CreateQuestionRequest = z.infer<typeof CreateQuestionRequestSchema>

const test: CreateQuestionRequest = {} as CreateQuestionRequest

export type User = {
    id: string
    role: 'NOOB' | 'PRO' | 'ADMIN'
    username: string
    createdAt: Date
}

export type QuestionPreviewData = {
    id: string
    authorId: string
    title: string
    content: string
    createdAt: Date
    lastEditedAt: Date | null

    user: User
    tags: {
        id: string
        name: string
    }[]

    score: number
    answerCount: number
    topAnswerRating: number
}

export type DetailQuestion = {
    id: string
    authorId: string
    title: string
    content: string
    createdAt: Date
    lastEditedAt: Date | null

    user: User
    tags: {
        id: string
        name: string
    }[]

    score: number
    comments: {
        id: string
        authorId: string
        createdAt: Date
        content: string
        lastEditedAt: Date | null
        questionId: string
        user: { id: string; username: string; role: 'NOOB' | 'PRO' | 'ADMIN'; createdAt: Date }
    }[]
    answers: {
        id: string
        authorId: string
        createdAt: Date
        content: string
        lastEditedAt: Date | null
        questionId: string
        commentAnswer: {
            id: string
            authorId: string
            createdAt: Date
            content: string
            lastEditedAt: Date | null
            answerId: string
            user: User
        }[]
        score: number
        rating: number
    }[]
}

export const UUIDSchema = z.string().uuid()
export type UUID = z.infer<typeof UUIDSchema>
