import { InsertUser, User } from './types'
import bcrypt from 'bcrypt'
import { question, user } from './schema'
import { db } from '../server'
import { getTableColumns } from 'drizzle-orm'
import { QueryResultType } from '../utils/typeUtils'

export const insertUser = async (
    createUser: Omit<InsertUser, 'password'>,
    password: InsertUser['password'],
): Promise<User> => {
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
