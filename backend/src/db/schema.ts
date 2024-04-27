//db schemas

//user table
import {
    boolean,
    date,
    pgEnum,
    pgTable,
    primaryKey,
    smallint,
    uuid,
    varchar,
} from 'drizzle-orm/pg-core'
import { number } from 'zod'

export const roleEnum = pgEnum('role', ['NOOB', 'PRO', 'ADMIN'])

export const user = pgTable('user', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    username: varchar('username').unique().notNull(),
    password: varchar('password').notNull(),
    role: roleEnum('role').default('NOOB').notNull(),
    createdAt: date('createdAt').defaultNow().notNull(),
})

export const question = pgTable('question', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    authorId: uuid('authorId')
        .references(() => user.id, { onDelete: 'cascade' })
        .notNull(),
    title: varchar('title', { length: 150 }).notNull(),
    content: varchar('content', { length: 10000 }).notNull(),
    createdAt: date('createdAt').defaultNow().notNull(),
    lastEditedAt: date('lastEditedAt'),
})

export const tag = pgTable('tag', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    name: varchar('name', { length: 20 }).unique().notNull(),
})

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

export const answer = pgTable('answer', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    questionId: uuid('questionId')
        .references(() => question.id, { onDelete: 'cascade' })
        .notNull(),
    authorId: uuid('authorId')
        .references(() => user.id, { onDelete: 'cascade' })
        .notNull(),
    content: varchar('content', { length: 10000 }).notNull(),
    createdAt: date('createdAt').defaultNow().notNull(),
    lastEditedAt: date('lastEditedAt'),
})

export const commentQuestion = pgTable('commentQuestion', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    questionId: uuid('questionId')
        .references(() => question.id, { onDelete: 'cascade' })
        .notNull(),
    authorId: uuid('authorId')
        .references(() => user.id, { onDelete: 'cascade' })
        .notNull(),
    content: varchar('content', { length: 500 }).notNull(),
    createdAt: date('createdAt').defaultNow().notNull(),
    lastEditedAt: date('lastEditedAt'),
})

export const commentAnswer = pgTable('commentAnswer', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    answerId: uuid('answerId')
        .references(() => answer.id, { onDelete: 'cascade' })
        .notNull(),
    authorId: uuid('authorId')
        .references(() => user.id, { onDelete: 'cascade' })
        .notNull(),
    content: varchar('content', { length: 500 }).notNull(),
    createdAt: date('createdAt').defaultNow().notNull(),
    lastEditedAt: date('lastEditedAt'),
})

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
