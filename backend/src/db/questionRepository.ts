import { CreateQuestionRequest } from '../shared/types'
import { question, question_tag, tag } from './schema'
import { getTableColumns } from 'drizzle-orm'
import { db } from '../server'
import { CreateQuestion, Question, QuestionTag } from './types'

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
