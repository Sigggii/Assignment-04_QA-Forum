//shared types between frontend and backend

import { z } from 'zod'
import { InsertQuestionSchema, CreateTagSchema } from '../db/types'

export const CreateQuestionRequestSchema = z.object({
    question: InsertQuestionSchema.pick({ title: true, content: true }),
    tags: z.array(CreateTagSchema.pick({ name: true })),
})

export type CreateQuestionRequest = z.infer<typeof CreateQuestionRequestSchema>

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
