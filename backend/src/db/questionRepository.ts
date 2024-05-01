import { question, question_tag, tag } from './schema'
import { getTableColumns } from 'drizzle-orm'
import { db } from '../server'
import { CreateQuestion, Question, QuestionTag } from './types'
import { QueryResultType } from '../utils/typeUtils'
import { UUID } from '../shared/types'
import { PostgresJsQueryResultHKT } from 'drizzle-orm/postgres-js'
import { PgTransaction } from 'drizzle-orm/pg-core'

export const createQuestionDB = async (createQuestion: CreateQuestion) => {
    const questionColumns = getTableColumns(question)
    const tagColumns = getTableColumns(tag)
    return await db.transaction(async (tx) => {
        const newQuestion: Question = (
            await tx.insert(question).values(createQuestion.question).returning(questionColumns)
        )[0]

        //Insert new Tags, if already exists, do nothing
        if (createQuestion.tags.length > 0) {
            const newTags = await tx
                .insert(tag)
                .values(createQuestion.tags)
                .onConflictDoNothing({ target: tag.name })
                .returning(tagColumns)

            const questionTags: QuestionTag[] = newTags.map((tag) => {
                return { questionId: newQuestion.id, tagId: tag.id }
            })
            await tx.insert(question_tag).values(questionTags)
        }

        return newQuestion
    })
}

const questionPreviewQuery = () =>
    db.query.question.findMany({
        with: {
            user: {
                columns: {
                    password: false,
                },
            },
            question_tag: {
                with: {
                    tag: true,
                },
            },
            votesQuestion: true,
            answer: {
                with: {
                    ratingAnswer: true,
                },
            },
        },
    })
export type QuestionPreviewResult = QueryResultType<typeof questionPreviewQuery>[number]
export const queryQuestions = async () => {
    return await questionPreviewQuery().execute()
}

const questionQueryPartial = (id: UUID) =>
    db.query.question.findFirst({
        with: {
            user: {
                columns: {
                    password: false,
                },
            },
            question_tag: {
                with: {
                    tag: true,
                },
            },
            votesQuestion: true,
            commentQuestion: {
                with: {
                    user: {
                        columns: {
                            password: false,
                        },
                    },
                },
            },
        },
        where: (question, { eq }) => eq(question.id, id),
    })

const answerQueryPartial = (id: UUID) =>
    db.query.answer.findMany({
        with: {
            votesAnswer: true,
            ratingAnswer: true,
            commentAnswer: {
                with: {
                    user: {
                        columns: {
                            password: false,
                        },
                    },
                },
            },
        },
        where: (answer, { eq }) => eq(answer.questionId, id),
    })

type QuestionQueryResultPartial = QueryResultType<typeof questionQueryPartial>
type AnswerQueryResultPartial = QueryResultType<typeof answerQueryPartial>

export type QuestionQueryResult = QuestionQueryResultPartial & { answers: AnswerQueryResultPartial }

export const queryQuestionById = async (id: UUID): Promise<QuestionQueryResult> => {
    const question = await questionQueryPartial(id).execute()
    //ToDo use custom Error
    if (!question) {
        throw new Error('Kein Anschluss unter dieser ID')
    }
    const answers = await answerQueryPartial(id).execute()
    return {
        ...question,
        answers: answers,
    }
}
