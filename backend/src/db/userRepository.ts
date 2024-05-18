import { InsertUser, User } from './types'
import bcrypt from 'bcrypt'
import { user } from './schema'
import { db } from '../server'
import { getTableColumns } from 'drizzle-orm'
import { QueryResultType } from '../utils/typeUtils'
import { Rating, UUID, Vote } from '../shared/types'
import { ResponseError } from '../routes/errorHandling/ResponseError'

/**
 * Insert User
 *
 * @param createUser data for creating a user
 * @param password password for the user
 */
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

/**
 *  get User By username
 *
 * @param username username of the user to get
 */
export const queryUserByUsername = async (username: string) => {
    return await userByUsernameQuery(username).execute()
}

/**
 * Get Upvote for a question
 *
 * @param userId id of the user to get vote for
 * @param questionId id of the question to get vote for
 */
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

/**
 * Get Upvote for a Answer
 *
 * @param userId id of the user to get upvote for
 * @param answerId id of the question to get upvote for
 */
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

/**
 * Get Rating for a Answer
 *
 * @param userId  userId of user to get rating for
 * @param answerId answerId of answer to get rating for
 */
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
