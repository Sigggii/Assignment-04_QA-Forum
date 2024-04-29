//shared types between frontend and backend

import { z } from 'zod'
import { InsertQuestionSchema, CreateTagSchema } from '../db/types'

export const CreateQuestionRequestSchema = z.object({
    question: InsertQuestionSchema.pick({ title: true, content: true }),
    tags: z.array(CreateTagSchema.pick({ name: true })),
})

export type CreateQuestionRequest = z.infer<typeof CreateQuestionRequestSchema>
