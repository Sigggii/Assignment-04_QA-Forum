import { PgRelationalQuery } from 'drizzle-orm/pg-core/query-builders/query'

export type QueryResultType<T extends () => PgRelationalQuery<any>> = Awaited<
    ReturnType<ReturnType<T>['execute']>
>
