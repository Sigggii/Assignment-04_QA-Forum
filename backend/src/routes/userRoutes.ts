import { BaseFastifyInstance } from '../server'
import { z } from 'zod'
import { UUID, UUIDSchema } from '../shared/types'
import { AuthorizedByUserIdGuard } from './authHandler'
import {
    getRatingForAnswer,
    getUpvoteForAnswer,
    getUpvoteForQuestion,
} from '../controller/userController'

export const userRoutes = async (fastify: BaseFastifyInstance) => {
    fastify.get(
        '/:userId/vote-question',
        {
            schema: {
                params: z.object({
                    userId: UUIDSchema,
                }),
                querystring: z.object({
                    questionId: UUIDSchema,
                }),
            },
            config: {
                rolesAllowed: 'ALL',
            },
            onRequest: [fastify.auth([fastify.authorize])],
        },
        async (req) => {
            const userId = (req.params as { userId: UUID }).userId
            const questionId = (req.query as { questionId: UUID }).questionId
            AuthorizedByUserIdGuard(req.authUser!, userId, true)

            const test = await getUpvoteForQuestion(userId, questionId)
            console.log(test)
            return test
        },
    )

    fastify.get(
        '/:userId/vote-answer',
        {
            schema: {
                params: z.object({
                    userId: UUIDSchema,
                }),
                querystring: z.object({
                    answerId: UUIDSchema,
                }),
            },
            config: {
                rolesAllowed: 'ALL',
            },
            onRequest: [fastify.auth([fastify.authorize])],
        },
        async (req) => {
            const userId = (req.params as { userId: UUID }).userId
            const answerId = (req.query as { answerId: UUID }).answerId
            AuthorizedByUserIdGuard(req.authUser!, userId, true)
            return await getUpvoteForAnswer(userId, answerId)
        },
    )

    fastify.get(
        '/:userId/rating-answer',
        {
            schema: {
                params: z.object({
                    userId: UUIDSchema,
                }),
                querystring: z.object({
                    answerId: UUIDSchema,
                }),
            },
            config: {
                rolesAllowed: 'ALL',
            },
            onRequest: [fastify.auth([fastify.authorize])],
        },
        async (req, resp) => {
            const userId = (req.params as { userId: UUID }).userId
            const answerId = (req.query as { answerId: UUID }).answerId
            AuthorizedByUserIdGuard(req.authUser!, userId, true)
            return await getRatingForAnswer(userId, answerId)
        },
    )
}
