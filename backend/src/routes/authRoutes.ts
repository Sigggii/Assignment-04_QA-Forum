import { BaseFastifyInstance } from '../server'
import { LoginSchema, LoginUser } from '../shared/types'
import { loginUser, registerUser } from '../controller/authController'
import { ResponseError } from './errorHandling/ResponseError'
import { getConfig } from '../system/EnvManager'

export const authRoutes = async (fastify: BaseFastifyInstance) => {
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
                //Expires in 7 days
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                httpOnly: true,
                sameSite: getConfig().NODE_ENV === 'production' ? 'strict' : 'none',
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
                //Expires in 7 days
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                httpOnly: true,
                sameSite: getConfig().NODE_ENV === 'production' ? 'strict' : 'none',
                path: '/',
            })
        },
    )

    fastify.post('/login', async (req, resp) => {
        let user: LoginUser
        try {
            user = LoginSchema.parse(req.body)
        } catch (err) {
            throw new ResponseError({
                status: 400,
                displayMessage: 'No user for this credentials',
                errors: [],
            })
        }

        const jwt = await loginUser(user)
        resp.setCookie('jwt', jwt, {
            //Expires in 7 days
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            sameSite: getConfig().NODE_ENV === 'production' ? 'strict' : 'none',
            path: '/',
        })
    })

    fastify.post('/logout', async (req, resp) => {
        resp.clearCookie('jwt')
    })

    fastify.get('/me', async (req) => {
        if (!req.authUser) return undefined
        return req.authUser
    })
}
