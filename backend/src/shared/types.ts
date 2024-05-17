import { z } from 'zod'
import {
    CreateTagSchema,
    InsertAnswerCommentSchema,
    InsertAnswerSchema,
    InsertQuestionCommentSchema,
    InsertQuestionSchema,
    InsertVoteAnswerSchema,
    InsertVoteQuestion,
} from '../db/types'

const tagsSchema = z.array(CreateTagSchema.pick({ name: true })).max(5, 'Maximum 5 Tags')

export const CreateQuestionRequestSchema = z.object({
    question: InsertQuestionSchema.pick({ title: true, content: true }),
    tags: tagsSchema,
})

export type CreateQuestionRequest = z.infer<typeof CreateQuestionRequestSchema>

export const UpdateQuestionRequestSchema = z.object({
    question: InsertQuestionSchema.pick({ title: true, content: true, authorId: true }),
    tags: tagsSchema,
})

export type UpdateQuestionRequest = z.infer<typeof UpdateQuestionRequestSchema>
export const CreateQuestionCommentRequestSchema = InsertQuestionCommentSchema.pick({
    content: true,
})

export type CreateQuestionCommentRequest = z.infer<typeof CreateQuestionCommentRequestSchema>

export const CreateAnswerCommentRequestSchema = InsertAnswerCommentSchema.pick({
    content: true,
})

export type CreateAnswerCommentRequest = z.infer<typeof CreateAnswerCommentRequestSchema>

export type Role = 'NOOB' | 'PRO' | 'ADMIN'

export type User = {
    id: string
    role: Role
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

export type Answer = {
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
    answers: Answer[]
}

export const CreateAnswerRequestSchema = InsertAnswerSchema.pick({
    content: true,
})

export type CreateAnswer = z.infer<typeof CreateAnswerRequestSchema>

export const UUIDSchema = z.string().uuid()
export type UUID = z.infer<typeof UUIDSchema>

export type JWTPayload = Omit<User, 'createdAt'>

export const LoginSchema = z.object({
    username: z
        .string()
        .describe('Username')
        .min(3, 'Username must be at least 3 characters long')
        .max(30, 'Username can be no longer than 30 characters'),

    password: z
        .string()
        .describe('Password')
        .min(8, 'Password must be at least 8 characters long')
        .max(265, 'Password can be no longer than 256 characters'),
})
export type LoginUser = z.infer<typeof LoginSchema>

// upvote is optional, if upvote is undefined, corresponding vote should be deleted
export const CreateVoteQuestionSchema = InsertVoteAnswerSchema.partial({ upvote: true }).pick({
    upvote: true,
})
export type CreateVoteQuestion = z.infer<typeof CreateVoteQuestionSchema>

// upvote is optional, if upvote is undefined, corresponding vote should be deleted
export const CreateVoteAnswerSchema = InsertVoteAnswerSchema.partial({ upvote: true }).pick({
    upvote: true,
})
export type CreateVoteAnswer = z.infer<typeof CreateVoteAnswerSchema>

export type Vote = boolean | undefined
