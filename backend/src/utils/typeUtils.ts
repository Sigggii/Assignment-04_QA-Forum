import { PgRelationalQuery } from 'drizzle-orm/pg-core/query-builders/query'

/**
 * Get the return type of drizzle query function.
 *
 * Format: () => drizzle.query.[...]
 * Generic input: typeof functionName
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type QueryResultType<T extends (...args: any[]) => PgRelationalQuery<any>> = Awaited<
    ReturnType<ReturnType<T>['execute']>
>
