import { z, ZodError } from 'zod'

const ENV_SCHEMA = z.object({
    PORT: z.coerce.number().optional().default(8080),
    DB_CONNECTION_STRING: z.string({ message: 'DB_CONNECTION_STRING is required' }),
    NODE_ENV: z
        .union([z.literal('development'), z.literal('testing'), z.literal('production')])
        .optional()
        .default('development'),
})
export type Config = z.infer<typeof ENV_SCHEMA>

let config: Config

/**
 * Checks if the environment variables are valid.
 * If not, logs the error and stops the application.
 *
 * Runs at the start of the application.
 */
export const checkEnv = () => {
    try {
        config = ENV_SCHEMA.parse(process.env)

        console.log('ENV variables are valid')
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

/**
 * Returns the config object.
 * @returns Config object
 */
export const getConfig = () => config
