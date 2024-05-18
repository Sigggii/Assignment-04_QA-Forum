import {
    boolean,
    pgEnum,
    pgTable,
    primaryKey,
    smallint,
    timestamp,
    uuid,
    varchar,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const roleEnum = pgEnum('role', ['NOOB', 'PRO', 'ADMIN'])

export const user = pgTable('user', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    username: varchar('username', { length: 30 }).unique().notNull(),
    password: varchar('password').notNull(),
    role: roleEnum('role').default('NOOB').notNull(),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
})
export const userRelations = relations(user, ({ many }) => ({
    questions: many(question),
    answers: many(answer),
    commentsOnQuestions: many(commentQuestion),
    commentsOnAnswers: many(commentAnswer),
    votesOnQuestions: many(votesQuestion),
    votesOnAnswers: many(votesAnswer),
    ratingsOnAnswers: many(ratingAnswer),
}))

export const question = pgTable('question', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    authorId: uuid('authorId')
        .references(() => user.id, { onDelete: 'cascade' })
        .notNull(),
    title: varchar('title', { length: 150 }).notNull(),
    content: varchar('content', { length: 10000 }).notNull(),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
    lastEditedAt: timestamp('lastEditedAt'),
})
export const questionRelations = relations(question, ({ one, many }) => ({
    user: one(user, { fields: [question.authorId], references: [user.id] }),
    answers: many(answer),
    comments: many(commentQuestion),
    tags: many(question_tag),
    votes: many(votesQuestion),
}))

export const tag = pgTable('tag', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    name: varchar('name', { length: 20 }).unique().notNull(),
})
export const tagRelations = relations(tag, ({ many }) => ({
    questions: many(question_tag),
}))

export const question_tag = pgTable(
    'question_tag',
    {
        questionId: uuid('questionId')
            .references(() => question.id, { onDelete: 'cascade' })
            .notNull(),
        tagId: uuid('tagId')
            .references(() => tag.id, { onDelete: 'cascade' })
            .notNull(),
    },
    (table) => {
        return {
            pk: primaryKey({ columns: [table.questionId, table.tagId] }),
        }
    },
)
export const question_tagRelations = relations(question_tag, ({ one }) => ({
    question: one(question, { fields: [question_tag.questionId], references: [question.id] }),
    tag: one(tag, { fields: [question_tag.tagId], references: [tag.id] }),
}))

export const answer = pgTable('answer', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    questionId: uuid('questionId')
        .references(() => question.id, { onDelete: 'cascade' })
        .notNull(),
    authorId: uuid('authorId')
        .references(() => user.id, { onDelete: 'cascade' })
        .notNull(),
    content: varchar('content', { length: 10000 }).notNull(),
    approved: boolean('approved').notNull().default(false),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
    lastEditedAt: timestamp('lastEditedAt'),
})
export const answerRelations = relations(answer, ({ one, many }) => ({
    user: one(user, { fields: [answer.authorId], references: [user.id] }),
    question: one(question, { fields: [answer.questionId], references: [question.id] }),
    comments: many(commentAnswer),
    ratings: many(ratingAnswer),
    votes: many(votesAnswer),
}))

export const commentQuestion = pgTable('commentQuestion', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    questionId: uuid('questionId')
        .references(() => question.id, { onDelete: 'cascade' })
        .notNull(),
    authorId: uuid('authorId')
        .references(() => user.id, { onDelete: 'cascade' })
        .notNull(),
    content: varchar('content', { length: 500 }).notNull(),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
    lastEditedAt: timestamp('lastEditedAt'),
})
export const commentQuestionRelations = relations(commentQuestion, ({ one }) => ({
    user: one(user, { fields: [commentQuestion.authorId], references: [user.id] }),
    question: one(question, { fields: [commentQuestion.questionId], references: [question.id] }),
}))

export const commentAnswer = pgTable('commentAnswer', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    answerId: uuid('answerId')
        .references(() => answer.id, { onDelete: 'cascade' })
        .notNull(),
    authorId: uuid('authorId')
        .references(() => user.id, { onDelete: 'cascade' })
        .notNull(),
    content: varchar('content', { length: 500 }).notNull(),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
    lastEditedAt: timestamp('lastEditedAt'),
})
export const commentAnswerRelations = relations(commentAnswer, ({ one }) => ({
    user: one(user, { fields: [commentAnswer.authorId], references: [user.id] }),
    answer: one(answer, { fields: [commentAnswer.answerId], references: [answer.id] }),
}))

export const votesQuestion = pgTable(
    'votesQuestion',
    {
        questionId: uuid('questionId')
            .references(() => question.id, { onDelete: 'cascade' })
            .notNull(),
        userId: uuid('userId')
            .references(() => user.id, { onDelete: 'cascade' })
            .notNull(),
        upvote: boolean('upvote').notNull(),
    },
    (table) => {
        return {
            pk: primaryKey({ columns: [table.questionId, table.userId] }),
        }
    },
)
export const votesQuestionRelation = relations(votesQuestion, ({ one }) => ({
    user: one(user, { fields: [votesQuestion.userId], references: [user.id] }),
    answer: one(question, { fields: [votesQuestion.questionId], references: [question.id] }),
}))

export const votesAnswer = pgTable(
    'votesAnswer',
    {
        answerId: uuid('answerId')
            .references(() => answer.id, { onDelete: 'cascade' })
            .notNull(),
        userId: uuid('userId')
            .references(() => user.id, { onDelete: 'cascade' })
            .notNull(),
        upvote: boolean('upvote').notNull(),
    },
    (table) => {
        return {
            pk: primaryKey({ columns: [table.answerId, table.userId] }),
        }
    },
)
export const votesAnswerRelation = relations(votesAnswer, ({ one }) => ({
    user: one(user, { fields: [votesAnswer.userId], references: [user.id] }),
    answer: one(answer, { fields: [votesAnswer.answerId], references: [answer.id] }),
}))

export const ratingAnswer = pgTable(
    'ratingAnswer',
    {
        answerId: uuid('answerId')
            .references(() => answer.id, { onDelete: 'cascade' })
            .notNull(),
        userId: uuid('userId')
            .references(() => user.id, { onDelete: 'cascade' })
            .notNull(),
        rating: smallint('rating').notNull(),
    },
    (table) => {
        return {
            pk: primaryKey({ columns: [table.answerId, table.userId] }),
        }
    },
)
export const ratingAnswerRelation = relations(ratingAnswer, ({ one }) => ({
    user: one(user, { fields: [ratingAnswer.userId], references: [user.id] }),
    answer: one(answer, { fields: [ratingAnswer.answerId], references: [answer.id] }),
}))
