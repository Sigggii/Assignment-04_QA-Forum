import { PgRelationalQuery } from 'drizzle-orm/pg-core/query-builders/query'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type QueryResultType<T extends () => PgRelationalQuery<any>> = Awaited<
    ReturnType<ReturnType<T>['execute']>
>
