type DateAsString = string

export type Role = 'NOOB' | 'PRO' | 'ADMIN'

export type User = {
    id: string
    role: Role
    username: string
    createdAt: DateAsString
}

export type Tag = {
    id: string
    name: string
}

export type CreateQuestionRequest = {
    question: { title: string; content: string }
    tags: { name: string }[]
}

export type CreateQuestionComment = {
    content: string
}

export type CreateAnswerComment = {
    content: string
}

export type CreateAnswer = {
    content: string
}

type BaseComment = {
    id: string
    authorId: string
    createdAt: DateAsString
    content: string
    lastEditedAt: DateAsString | null
    user: User
}
export type CommentOnAnswer = BaseComment & { answerId: string }
export type CommentOnQuestion = BaseComment & { questionId: string }

export type Question = {
    id: string
    authorId: string
    createdAt: DateAsString
    title: string
    content: string
    lastEditedAt: DateAsString | null
}

export type QuestionPreviewData = {
    id: string
    authorId: string
    title: string
    content: string
    createdAt: DateAsString
    lastEditedAt: DateAsString | null

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
    createdAt: DateAsString
    content: string
    lastEditedAt: DateAsString | null
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
    createdAt: DateAsString
    lastEditedAt: DateAsString | null

    user: User
    tags: Tag[]

    score: number
    comments: CommentOnQuestion[]
    answers: Answer[]
}

export type LoginUser = { username: string; password: string }

export type JWTPayload = {
    id: string
    role: 'NOOB' | 'PRO' | 'ADMIN'
    username: string
}
