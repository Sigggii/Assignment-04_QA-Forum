import { BaseFastifyInstance } from '../server'
import {
    CreateAnswer,
    CreateAnswerCommentRequest,
    CreateAnswerCommentRequestSchema,
    CreateAnswerRequestSchema,
    CreateQuestionCommentRequest,
    CreateQuestionCommentRequestSchema,
    CreateQuestionRequestSchema,
    UUIDSchema,
} from '../shared/types'
import {
    createAnswer,
    createAnswerComment,
    createQuestion,
    createQuestionComment,
    getQuestionById,
    getQuestions,
} from '../controller/questionController'
import { z } from 'zod'
import { CreateQuestion } from '../db/types'

export const questionRoutes = (fastify: BaseFastifyInstance, opt: any, done: any) => {
    fastify.post(
        '/',
        {
            schema: {
                body: CreateQuestionRequestSchema,
            },
            config: {
                rolesAllowed: 'ALL',
            },
            onRequest: [fastify.auth([fastify.authorize])],
        },
        async (req, rep) => {
            //ToDo If authentication is etablished: Use real userId, this is only for testing purposes
            const userId = 'da7cbcff-a968-4f99-bd9b-0bf0567fc4e5'
            // ToDo fix stupid type cast
            const question = req.body as CreateQuestion
            const createdQuestion = await createQuestion(question, userId)

            rep.status(201).send(createdQuestion)
        },
    )

    fastify.get('/', async (req, rep) => {
        try {
            return await getQuestions()
        } catch (err) {
            console.log(err)
        }
    })

    fastify.get(
        '/:id',
        {
            schema: {
                params: z.object({
                    id: UUIDSchema,
                }),
            },
        },

        async (req, rep) => {
            try {
                const { id } = req.params
                return await getQuestionById(id)
            } catch (err) {
                console.log(err)
            }
        },
    )

    fastify.post(
        '/:id/comments',
        {
            schema: {
                body: CreateQuestionCommentRequestSchema,
                params: z.object({
                    id: UUIDSchema,
                }),
            },
            config: {
                rolesAllowed: 'ALL',
            },
            onRequest: [fastify.auth([fastify.authorize])],
        },
        async (req, resp) => {
            //ToDo If authentication is etablished: Use real userId, this is only for testing purposes
            const userId = 'da7cbcff-a968-4f99-bd9b-0bf0567fc4e5'
            const questionId = (req.params as { id: string }).id
            await createQuestionComment(
                req.body as CreateQuestionCommentRequest,
                questionId,
                userId,
            )
            resp.status(201).send()
        },
    )

    fastify.post(
        '/:id/answers',
        {
            schema: {
                body: CreateAnswerRequestSchema,
                params: z.object({
                    id: UUIDSchema,
                }),
            },
            config: {
                rolesAllowed: 'ALL',
            },
            onRequest: [fastify.auth([fastify.authorize])],
        },
        async (req, resp) => {
            const questionId = (req.params as { id: string }).id
            //ToDo If authentication is etablished: Use real userId, this is only for testing purposes
            const userId = 'da7cbcff-a968-4f99-bd9b-0bf0567fc4e5'
            const body = req.body as CreateAnswer
            await createAnswer(body, questionId, userId)
            resp.status(201)
        },
    )

    fastify.post(
        '/:questionId/answers/:answerId/comments',
        {
            schema: {
                body: CreateAnswerCommentRequestSchema,
                params: z.object({
                    questionId: UUIDSchema,
                    answerId: UUIDSchema,
                }),
            },
            config: {
                rolesAllowed: 'ALL',
            },
            onRequest: [fastify.auth([fastify.authorize])],
        },
        async (req, resp) => {
            const answerId = (req.params as { answerId: string }).answerId
            //ToDo If authentication is etablished: Use real userId, this is only for testing purposes
            const userId = 'da7cbcff-a968-4f99-bd9b-0bf0567fc4e5'
            await createAnswerComment(req.body as CreateAnswerCommentRequest, answerId, userId)
            resp.status(201)
        },
    )

    done()
}
