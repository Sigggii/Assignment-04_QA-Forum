import { BaseFastifyInstance } from '../server'
import { CreateQuestionRequestSchema } from '../shared/types'
import { createQuestion, getQuestions } from '../controller/questionController'

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

    done()
}
