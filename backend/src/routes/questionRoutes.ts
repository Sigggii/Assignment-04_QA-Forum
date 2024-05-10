import { BaseFastifyInstance } from '../server'
import {
    CreateAnswerCommentRequestSchema,
    CreateAnswerRequestSchema,
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

export const questionRoutes = (fastify: BaseFastifyInstance, opt: any, done: any) => {
    fastify.post(
        '/',
        {
            schema: {
                body: CreateQuestionRequestSchema,
            },
        },
        async (req, rep) => {
            try {
                //ToDo If authentication is etablished: Use real userId, this is only for testing purposes
                const userId = 'da7cbcff-a968-4f99-bd9b-0bf0567fc4e5'
                const question = req.body
                const createdQuestion = await createQuestion(question, userId)

                rep.status(201).send(createdQuestion)
            } catch (err) {
                console.log(err)
            }
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
        },
        async (req, resp) => {
            //ToDo If authentication is etablished: Use real userId, this is only for testing purposes
            const userId = 'da7cbcff-a968-4f99-bd9b-0bf0567fc4e5'
            const questionId = req.params.id
            await createQuestionComment(req.body, questionId, userId)
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
        },
        async (req, resp) => {
            const questionId = req.params.id
            //ToDo If authentication is etablished: Use real userId, this is only for testing purposes
            const userId = 'da7cbcff-a968-4f99-bd9b-0bf0567fc4e5'
            const body = req.body
            await createAnswer(body, questionId, userId)
            resp.status(201)
        },
    )

    fastify.post(
        '/:questionId/answers/:answerId',
        {
            schema: {
                body: CreateAnswerCommentRequestSchema,
                params: z.object({
                    questionId: UUIDSchema,
                    answerId: UUIDSchema,
                }),
            },
        },
        async (req, resp) => {
            const answerId = req.params.answerId
            //ToDo If authentication is etablished: Use real userId, this is only for testing purposes
            const userId = 'da7cbcff-a968-4f99-bd9b-0bf0567fc4e5'

            await createAnswerComment(req.body, answerId, userId)
            resp.status(201)
        },
    )

    done()
}
