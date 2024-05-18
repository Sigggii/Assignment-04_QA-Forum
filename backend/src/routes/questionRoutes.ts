import { BaseFastifyInstance } from '../server'
import {
    CreateAnswer,
    CreateAnswerCommentRequest,
    CreateAnswerCommentRequestSchema,
    CreateAnswerRequestSchema,
    CreateQuestionCommentRequest,
    CreateQuestionCommentRequestSchema,
    CreateQuestionRequest,
    CreateQuestionRequestSchema,
    GetQuestionsParamsSchema,
    UpdateQuestionRequest,
    UpdateQuestionRequestSchema,
    UUID,
    UUIDSchema,
} from '../shared/types'
import {
    createAnswer,
    createAnswerComment,
    createQuestion,
    createQuestionComment,
    deleteAnswer,
    deleteQuestion,
    getQuestionById,
    getQuestions,
    updateAnswer,
    updateQuestion,
} from '../controller/questionController'
import { z } from 'zod'
import { AuthorizedByUserIdGuard } from './authHandler'
import { getAnswerByIdQuery } from '../db/answerRepository'

export const questionRoutes = async (fastify: BaseFastifyInstance) => {
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
            const userId = req.authUser!.id
            // ToDo fix stupid type cast
            const question = req.body as CreateQuestionRequest
            const createdQuestion = await createQuestion(question, userId)

            rep.status(201).send(createdQuestion)
        },
    )

    fastify.put(
        '/:questionId',
        {
            schema: {
                body: UpdateQuestionRequestSchema,
                params: z.object({
                    questionId: UUIDSchema,
                }),
            },
            config: {
                rolesAllowed: 'ALL',
            },
            onRequest: [fastify.auth([fastify.authorize])],
        },
        async (req, resp) => {
            const question = req.body as UpdateQuestionRequest
            const questionId = (req.params as { questionId: UUID }).questionId
            const editCheckQuestion = await getQuestionById(questionId)
            AuthorizedByUserIdGuard(req.authUser!, editCheckQuestion.authorId, true)
            await updateQuestion(question, questionId)
            resp.status(204)
        },
    )

    fastify.delete(
        '/:questionId',
        {
            schema: {
                params: z.object({
                    questionId: UUIDSchema,
                }),
            },
            config: {
                rolesAllowed: 'ALL',
            },
            onRequest: [fastify.auth([fastify.authorize])],
        },
        async (req, resp) => {
            const questionId = (req.params as { questionId: UUID }).questionId
            const question = await getQuestionById(questionId)
            AuthorizedByUserIdGuard(req.authUser!, question.authorId, true)
            await deleteQuestion(questionId)
            resp.status(204)
        },
    )

    fastify.get('/', { schema: { querystring: GetQuestionsParamsSchema } }, async (req) => {
        try {
            const query = req.query.query

            return await getQuestions(query)
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

        async (req) => {
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
            const userId = req.authUser!.id
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
                rolesAllowed: ['PRO'],
            },
            onRequest: [fastify.auth([fastify.authorize])],
        },
        async (req, resp) => {
            const questionId = (req.params as { id: string }).id
            const userId = req.authUser!.id
            const body = req.body as CreateAnswer
            await createAnswer(body, questionId, userId)
            resp.status(201)
        },
    )

    fastify.put(
        '/:questionId/answers/:answerId',
        {
            schema: {
                body: CreateAnswerRequestSchema,
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
            const answerId = (req.params as { questionId: UUID; answerId: UUID }).answerId
            const answerToCheck = await getAnswerByIdQuery(answerId)
            AuthorizedByUserIdGuard(req.authUser!, answerToCheck.authorId, true)
            const answer = req.body as CreateAnswer
            await updateAnswer(answer, answerId)
            resp.status(204)
        },
    )

    fastify.delete(
        '/:questionId/answers/:answerId',
        {
            schema: {
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
            const answerId = (req.params as { questionId: UUID; answerId: UUID }).answerId
            const answerToCheck = await getAnswerByIdQuery(answerId)
            AuthorizedByUserIdGuard(req.authUser!, answerToCheck.authorId, true)
            await deleteAnswer(answerId)
            resp.status(204)
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
            const userId = req.authUser!.id
            await createAnswerComment(req.body as CreateAnswerCommentRequest, answerId, userId)
            resp.status(201)
        },
    )
}
