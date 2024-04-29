import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { question, question_tag, tag } from './schema'
import { z } from 'zod'

export const InsertQuestionSchema = createInsertSchema(question)
export const SelectQuestionSchema = createSelectSchema(question)
export const CreateTagSchema = createInsertSchema(tag)
export const SelectTagSchema = createSelectSchema(tag)

export const SelectQuestionTagSchema = createSelectSchema(question_tag)

export type Question = z.infer<typeof SelectQuestionSchema>
export type Tag = z.infer<typeof SelectTagSchema>
export type QuestionTag = z.infer<typeof SelectQuestionTagSchema>

export const CreateQuestionSchema = z.object({
    question: InsertQuestionSchema.pick({ title: true, content: true, authorId: true }),
    tags: z.array(CreateTagSchema.pick({ name: true })),
})

export type CreateQuestion = z.infer<typeof CreateQuestionSchema>
