import { BaseFastifyInstance } from '../server'
import {
    ApproveAnswerRequest,
    ApproveAnswerRequestSchema,
    CreateAnswer,
    CreateAnswerCommentRequest,
    CreateAnswerCommentRequestSchema,
    CreateAnswerRequestSchema,
    CreateQuestionCommentRequest,
    CreateQuestionCommentRequestSchema,
    CreateQuestionRequest,
    CreateQuestionRequestSchema,
    CreateRatingAnswer,
    CreateRatingAnswerSchema,
    CreateVoteAnswer,
    CreateVoteAnswerSchema,
    CreateVoteQuestion,
    CreateVoteQuestionSchema,
    GetQuestionsParamsSchema,
    UpdateQuestionRequest,
    UpdateQuestionRequestSchema,
    UUID,
    UUIDSchema,
} from '../shared/types'
import {
    approveAnswer,
    createAnswer,
    createAnswerComment,
    createQuestion,
    createQuestionComment,
    createRatingAnswer,
    createVoteAnswer,
    createVoteQuestion,
    deleteAnswer,
    deleteAnswerComment,
    deleteQuestion,
    deleteQuestionComment,
    getMyQuestions,
    getQuestionById,
    getQuestions,
    updateAnswer,
    updateAnswerComment,
    updateQuestion,
    updateQuestionComment,
} from '../controller/questionController'
import { z } from 'zod'
import { AuthorizedByUserIdGuard } from './authHandler'
import { getAnswerByIdQuery, getAnswerCommentByIdQuery } from '../db/answerRepository'
import { getQuestionCommentByIdQuery } from '../db/questionRepository'

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
        const query = req.query.query

        return await getQuestions(query)
    })

    fastify.get(
        '/me',
        {
            config: {
                rolesAllowed: 'ALL',
            },
            onRequest: [fastify.auth([fastify.authorize])],
        },
        async (req) => {
            const userId = req.authUser!.id
            return await getMyQuestions(userId)
        },
    )

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
            const { id } = req.params
            return await getQuestionById(id)
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

    fastify.put(
        '/:questionId/comments/:commentId',
        {
            schema: {
                body: CreateQuestionCommentRequestSchema,
                params: z.object({
                    questionId: UUIDSchema,
                    commentId: UUIDSchema,
                }),
            },
            config: {
                rolesAllowed: 'ALL',
            },
            onRequest: [fastify.auth([fastify.authorize])],
        },
        async (req, resp) => {
            const commentId = (req.params as { questionId: UUID; commentId: UUID }).commentId
            const commentToCheck = await getQuestionCommentByIdQuery(commentId)
            AuthorizedByUserIdGuard(req.authUser!, commentToCheck.authorId, true)
            const comment = req.body as CreateQuestionCommentRequest
            await updateQuestionComment(comment, commentId)
            resp.status(204)
        },
    )

    fastify.delete(
        '/:questionId/comments/:commentId',
        {
            schema: {
                params: z.object({
                    questionId: UUIDSchema,
                    commentId: UUIDSchema,
                }),
            },
            config: {
                rolesAllowed: 'ALL',
            },
            onRequest: [fastify.auth([fastify.authorize])],
        },
        async (req, resp) => {
            const commentId = (req.params as { questionId: UUID; commentId: UUID }).commentId
            const commentToCheck = await getQuestionCommentByIdQuery(commentId)
            AuthorizedByUserIdGuard(req.authUser!, commentToCheck.authorId, true)
            await deleteQuestionComment(commentId)
            resp.status(204)
        },
    )

    fastify.post(
        '/:questionId/vote',
        {
            schema: {
                body: CreateVoteQuestionSchema,
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
            const userId = req.authUser!.id
            const vote = req.body as CreateVoteQuestion
            await createVoteQuestion(questionId, userId, vote)
            resp.status(204)
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
                rolesAllowed: ['PRO', 'ADMIN'],
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

    fastify.put(
        '/:questionId/answers/:answerId/approve',
        {
            schema: {
                body: ApproveAnswerRequestSchema,
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
            const { answerId } = req.params as { questionId: UUID; answerId: UUID }
            const answerToCheck = await getAnswerByIdQuery(answerId)
            const questionToCheck = await getQuestionById(answerToCheck.questionId)
            AuthorizedByUserIdGuard(req.authUser!, questionToCheck.authorId, true)
            const isApproved = req.body as ApproveAnswerRequest
            await approveAnswer(answerId, isApproved.isApproved)
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

    fastify.put(
        '/:questionId/answers/:answerId/comments/:commentId',
        {
            schema: {
                body: CreateAnswerCommentRequestSchema,
                params: z.object({
                    questionId: UUIDSchema,
                    answerId: UUIDSchema,
                    commentId: UUIDSchema,
                }),
            },
            config: {
                rolesAllowed: 'ALL',
            },
            onRequest: [fastify.auth([fastify.authorize])],
        },
        async (req, resp) => {
            const commentId = (req.params as { questionId: UUID; answerId: UUID; commentId: UUID })
                .commentId
            const commentToCheck = await getAnswerCommentByIdQuery(commentId)
            AuthorizedByUserIdGuard(req.authUser!, commentToCheck.authorId, true)
            const comment = req.body as CreateAnswerCommentRequest
            await updateAnswerComment(comment, commentId)
            resp.status(204)
        },
    )

    fastify.delete(
        '/:questionId/answers/:answerId/comments/:commentId',
        {
            schema: {
                params: z.object({
                    questionId: UUIDSchema,
                    answerId: UUIDSchema,
                    commentId: UUIDSchema,
                }),
            },
            config: {
                rolesAllowed: 'ALL',
            },
            onRequest: [fastify.auth([fastify.authorize])],
        },
        async (req, resp) => {
            const commentId = (req.params as { questionId: UUID; answerId: UUID; commentId: UUID })
                .commentId
            const commentToCheck = await getAnswerCommentByIdQuery(commentId)
            AuthorizedByUserIdGuard(req.authUser!, commentToCheck.authorId, true)
            await deleteAnswerComment(commentId)
            resp.status(204)
        },
    )

    fastify.post(
        '/:questionId/answers/:answerId/vote',
        {
            schema: {
                body: CreateVoteAnswerSchema,
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
            const userId = req.authUser!.id
            const vote = req.body as CreateVoteAnswer
            await createVoteAnswer(answerId, userId, vote)
            resp.status(204)
        },
    )

    fastify.post(
        '/:questionId/answers/:answerId/rate',
        {
            schema: {
                body: CreateRatingAnswerSchema,
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
            const userId = req.authUser!.id
            const rating = req.body as CreateRatingAnswer
            await createRatingAnswer(answerId, userId, rating)
            resp.status(204)
        },
    )
}
