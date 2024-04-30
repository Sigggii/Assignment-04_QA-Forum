//shared types between frontend and backend

import { z } from 'zod'
import { InsertQuestionSchema, CreateTagSchema } from '../db/types'

export const CreateQuestionRequestSchema = z.object({
    question: InsertQuestionSchema.pick({ title: true, content: true }),
    tags: z.array(CreateTagSchema.pick({ name: true })).max(5, 'Maximum 5 Tags'),
})

export type CreateQuestionRequest = z.infer<typeof CreateQuestionRequestSchema>

export type QuestionData = {
    id: string
    createdAt: string
    authorId: string
    title: string
    content: string
    lastEditedAt: string | null
    user: {
        id: string
        role: 'NOOB' | 'PRO' | 'ADMIN'
        username: string
        createdAt: string
    }
    tags: {
        id: string
        name: string
    }[]

    score: number
    answerCount: number
    topAnswerRating: number
}
