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

export type Question = {
    id: string
    authorId: string
    createdAt: Date
    title: string
    content: string
    lastEditedAt: Date | null
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
    comments: Comment[]
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
    comments: Comment[]
    answers: Answer[]
}

export type Comment = {
    id: string
    authorId: string
    createdAt: DateAsString
    content: string
    lastEditedAt: DateAsString | null
    answerId: string
    user: User
}
