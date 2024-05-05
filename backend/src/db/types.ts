import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { answer, commentAnswer, commentQuestion, question, question_tag, tag } from './schema'
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

export const InsertQuestionCommentSchema = createInsertSchema(commentQuestion).pick({
    questionId: true,
    authorId: true,
    content: true,
})

export type InsertQuestionComment = z.infer<typeof InsertQuestionCommentSchema>

export const InsertAnswerCommentSchema = createInsertSchema(commentAnswer).pick({
    answerId: true,
    authorId: true,
    content: true,
})

export type InsertAnswerComment = z.infer<typeof InsertAnswerCommentSchema>

export const InsertAnswerSchema = createInsertSchema(answer).pick({
    authorId: true,
    questionId: true,
    content: true,
})
export type InsertAnswer = z.infer<typeof InsertAnswerSchema>
