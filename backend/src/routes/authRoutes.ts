import { BaseFastifyInstance } from '../server'
import { LoginSchema } from '../shared/types'
import { loginUser, registerUser } from '../controller/authController'

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
                //Expires in 7 days
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
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
                //Expires in 7 days
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                httpOnly: true,
                sameSite: 'none',
                path: '/',
            })
        },
    )

    fastify.post('/logout', async (req, resp) => {
        resp.clearCookie('jwt')
    })

    fastify.get('/me', async (req) => {
        if (!req.authUser) return undefined
        console.log(req.authUser)
        return req.authUser
    })
}
