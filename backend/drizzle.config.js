"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    schema: './src/db/schema.ts',
    out: './drizzle',
    driver: 'pg',
    dbCredentials: {
        connectionString: 'postgres://admin:admin@localhost:5432/qa-forum',
    },
};
