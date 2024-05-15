import { InsertUser } from '../db/types'
import { insertUser, queryUserByUsername } from '../db/userRepository'
import { getConfig } from '../system/EnvManager'
import jwt from 'jsonwebtoken'
import { JWTPayload, LoginUser } from '../shared/types'
import bcrypt from 'bcrypt'

export const registerUser = async (user: InsertUser): Promise<string> => {
    const registeredUser = await insertUser(user, user.password)
    const jwtSecret = getConfig().JWT_SECRET
    //Payload is created by hand, to prevent unwanted data like passwords in the jwt token
    const jwtpayload: JWTPayload = {
        id: registeredUser.id,
        username: registeredUser.username,
        role: registeredUser.role,
    }
    return jwt.sign(jwtpayload, jwtSecret)
}

export const loginUser = async (user: LoginUser): Promise<string> => {
    const compareUser = await queryUserByUsername(user.username)
    if (!compareUser) throw new Error('User with that username does not exist')

    const passwordMatch = await bcrypt.compare(user.password, compareUser.password)
    if (!passwordMatch) throw new Error("Password doesn't match")

    const jwtSecret = getConfig().JWT_SECRET
    //Payload is created by hand, to prevent unwanted data like passwords in the jwt token
    const jwtpayload: JWTPayload = {
        id: compareUser.id,
        username: compareUser.username,
        role: compareUser.role,
    }
    return jwt.sign(jwtpayload, jwtSecret)
}
