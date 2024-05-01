type DateAsString = string

export type Role = 'NOOB' | 'PRO' | 'ADMIN'

export type User = {
    id: string
    role: Role
    username: string
    createdAt: DateAsString
}

export type QuestionPreviewData = {
    id: string
    authorId: string
    title: string
    content: string
    createdAt: DateAsString
    lastEditedAt: DateAsString | null

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
    createdAt: DateAsString
    lastEditedAt: DateAsString | null

    user: User
    tags: {
        id: string
        name: string
    }[]

    score: number
    comments: {
        id: string
        authorId: string
        createdAt: DateAsString
        content: string
        lastEditedAt: DateAsString | null
        questionId: string
        user: {
            id: string
            username: string
            role: 'NOOB' | 'PRO' | 'ADMIN'
            createdAt: DateAsString
        }
    }[]
    answers: {
        id: string
        authorId: string
        createdAt: DateAsString
        content: string
        lastEditedAt: DateAsString | null
        questionId: string
        commentAnswer: {
            id: string
            authorId: string
            createdAt: DateAsString
            content: string
            lastEditedAt: DateAsString | null
            answerId: string
            user: User
        }[]
        score: number
        rating: number
    }[]
}
