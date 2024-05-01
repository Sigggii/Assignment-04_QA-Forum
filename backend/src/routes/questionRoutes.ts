import { BaseFastifyInstance } from '../server'
import { CreateQuestionRequestSchema, UUID, UUIDSchema } from '../shared/types'
import { createQuestion, getQuestionById, getQuestions } from '../controller/questionController'
import { queryQuestionById } from '../db/questionRepository'
import { z } from 'zod'

export const questionRoutes = (fastify: BaseFastifyInstance, opt: any, done: any) => {
    fastify.post(
        '/:id',
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

    fastify.get<{ Params: { id: UUID } }>(
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

    done()
}
