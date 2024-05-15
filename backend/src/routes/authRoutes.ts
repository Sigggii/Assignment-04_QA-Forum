import { BaseFastifyInstance } from '../server'
import { JWTPayload, LoginSchema } from '../shared/types'
import { loginUser, registerUser } from '../controller/authController'
import { getConfig } from '../system/EnvManager'
import jwt from 'jsonwebtoken'
import auth from '@fastify/auth'

export const authRoutes = (fastify: BaseFastifyInstance, opt: any, done: any) => {
    fastify.post(
        '/register/noob',
        {
            schema: {
                body: LoginSchema,
            },
        },
        async (req, resp) => {
            const newUser = req.body
            const jwt = await registerUser({ ...newUser, role: 'NOOB' })
            resp.setCookie('jwt', jwt, {
                //Expires in 1 day
                expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
                httpOnly: true,
                sameSite: 'none',
                path: '/',
            })
        },
    )

    fastify.post(
        '/register/pro',
        {
            schema: {
                body: LoginSchema,
            },
        },
        async (req, resp) => {
            const newUser = req.body
            const jwt = await registerUser({ ...newUser, role: 'PRO' })
            resp.setCookie('jwt', jwt, {
                //Expires in 1 day
                expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
                httpOnly: true,
                sameSite: 'none',
                path: '/',
            })
        },
    )

    fastify.post(
        '/login',
        {
            schema: {
                body: LoginSchema,
            },
        },
        async (req, resp) => {
            const user = req.body
            const jwt = await loginUser(user)
            resp.setCookie('jwt', jwt, {
                //Expires in 1 day
                expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
                httpOnly: true,
                sameSite: 'none',
                path: '/',
            })
        },
    )

    fastify.post('/logout', async (req, resp) => {
        resp.clearCookie('jwt')
    })

    fastify.get('/me', async (req, resp) => {
        if (!req.authUser) return undefined
        return req.authUser
    })

    done()
}
