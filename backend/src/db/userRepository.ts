import { InsertUser, User } from './types'
import bcrypt from 'bcrypt'
import { user } from './schema'
import { db } from '../server'
import { getTableColumns } from 'drizzle-orm'
import { QueryResultType } from '../utils/typeUtils'
import { Rating, UUID, Vote } from '../shared/types'
import { ResponseError } from '../routes/errorHandling/ResponseError'

export const insertUser = async (
    createUser: Omit<InsertUser, 'password'>,
    password: InsertUser['password'],
): Promise<User> => {
    //check if username already exists
    const userAlreadyExists = !!(await db.query.user.findFirst({
        where: (user, { eq }) => eq(user.username, createUser.username),
    }))

    if (userAlreadyExists) {
        throw new ResponseError({
            status: 400,
            displayMessage: 'Username already exists',
            errors: [],
        })
    }

    const saltRounds = 10

    const passwordHash = await bcrypt.hash(password, saltRounds)
    const userColumns = getTableColumns(user)
    return (
        await db
            .insert(user)
            .values({ ...createUser, password: passwordHash })
            .returning(userColumns)
    )[0]
}

const userByUsernameQuery = (username: string) =>
    db.query.user.findFirst({ where: (user, { eq }) => eq(user.username, username) })

export type UserQueryByUsernameResult = QueryResultType<typeof userByUsernameQuery>
export const queryUserByUsername = async (username: string) => {
    return await userByUsernameQuery(username).execute()
}

export const getUpvoteForQuestionQuery = async (userId: UUID, questionId: UUID): Promise<Vote> => {
    return (
        await db.query.votesQuestion
            .findFirst({
                columns: { upvote: true },
                where: (votesQuestion, { eq, and }) =>
                    and(eq(votesQuestion.questionId, questionId), eq(votesQuestion.userId, userId)),
            })
            .execute()
    )?.upvote
}

export const getUpvoteForAnswerQuery = async (userId: UUID, answerId: UUID): Promise<Vote> => {
    return (
        await db.query.votesAnswer
            .findFirst({
                columns: { upvote: true },
                where: (votesAnswer, { eq, and }) =>
                    and(eq(votesAnswer.answerId, answerId), eq(votesAnswer.userId, userId)),
            })
            .execute()
    )?.upvote
}

export const getRatingForAnswerQuery = async (userId: UUID, answerId: UUID): Promise<Rating> => {
    return (
        await db.query.ratingAnswer
            .findFirst({
                columns: { rating: true },
                where: (ratingAnswer, { eq, and }) =>
                    and(eq(ratingAnswer.answerId, answerId), eq(ratingAnswer.userId, userId)),
            })
            .execute()
    )?.rating
}
