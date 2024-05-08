//shared types between frontend and backend

import { z } from 'zod'
import {
    InsertQuestionSchema,
    CreateTagSchema,
    InsertQuestionCommentSchema,
    InsertAnswerSchema,
    InsertAnswerCommentSchema,
} from '../db/types'
export const CreateQuestionRequestSchema = z.object({
    question: InsertQuestionSchema.pick({ title: true, content: true }),
    tags: z.array(CreateTagSchema.pick({ name: true })).max(5, 'Maximum 5 Tags'),
})

export type CreateQuestionRequest = z.infer<typeof CreateQuestionRequestSchema>

export const CreateQuestionCommentRequestSchema = InsertQuestionCommentSchema.pick({
    content: true,
})

export type CreateQuestionCommentRequest = z.infer<typeof CreateQuestionCommentRequestSchema>

export const CreateAnswerCommentRequestSchema = InsertAnswerCommentSchema.pick({
    content: true,
})

export type CreateAnswerCommentRequest = z.infer<typeof CreateAnswerCommentRequestSchema>

export type User = {
    id: string
    role: 'NOOB' | 'PRO' | 'ADMIN'
    username: string
    createdAt: Date
}

type Tag = {
    id: string
    name: string
}

type Comment = {
    id: string
    authorId: string
    createdAt: Date
    content: string
    lastEditedAt: Date | null
    user: User
}
type CommentOnAnswer = Comment & { answerId: string }
type CommentOnQuestion = Comment & { questionId: string }

export type QuestionPreviewData = {
    id: string
    authorId: string
    title: string
    content: string
    createdAt: Date
    lastEditedAt: Date | null

    user: User
    tags: Tag[]

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
    tags: Tag[]

    score: number
    comments: CommentOnQuestion[]
    answers: {
        id: string
        authorId: string
        user: User
        createdAt: Date
        content: string
        lastEditedAt: Date | null
        questionId: string
        comments: CommentOnAnswer[]
        score: number
        rating: number
    }[]
}

export const CreateAnswerRequestSchema = InsertAnswerSchema.pick({
    content: true,
})

export type CreateAnswer = z.infer<typeof CreateAnswerRequestSchema>

export const UUIDSchema = z.string().uuid()
export type UUID = z.infer<typeof UUIDSchema>
