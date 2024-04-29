import { z, ZodError } from 'zod'

const ENV_SCHEMA = z.object({
    PORT: z.coerce.number().optional().default(8080),
    DB_CONNECTION_STRING: z.string({ message: 'DB_CONNECTION_STRING is required' }),
    NODE_ENV: z
        .union([z.literal('development'), z.literal('testing'), z.literal('production')])
        .optional()
        .default('development'),
})

export const checkEnv = () => {
    try {
        ENV_SCHEMA.parse(process.env)
    } catch (error) {
        if (error instanceof ZodError) {
            console.error(
                'Error in ENV variables:',
                error.issues.map((err) => err.message).join(',\n'),
            )
            process.exit(1)
        }
    }
}

export const getConfig = () => ENV_SCHEMA.parse(process.env)
