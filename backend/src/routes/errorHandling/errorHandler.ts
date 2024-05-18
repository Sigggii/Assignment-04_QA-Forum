import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'
import * as repl from 'repl'
import { err } from 'drizzle-kit/cli/views'
import { ResponseError } from './ResponseError'

export type ErrorResponse = {
    status: number
    displayMessage: string
    errors: any[]
}

/**
 * Handles errors and sends a response to the client to make error easy parsable in frontend.
 * @param error
 * @param request
 * @param reply
 */
export const errorHandler = (error: Error, request: FastifyRequest, reply: FastifyReply) => {
    let ErrorResponse: ErrorResponse = {
        status: 500,
        displayMessage: 'Unexcpected Error',
        errors: [],
    }
    if (error instanceof ZodError) {
        ErrorResponse = {
            status: 400,
            displayMessage: 'Data Validation Error',
            errors: error.errors,
        }
    } else if (error instanceof ResponseError) {
        ErrorResponse = error.payload
    } else {
        ErrorResponse = {
            status: 500,
            displayMessage: 'Unexpected Error',
            errors: [error],
        }
    }

    reply.code(ErrorResponse.status).send(ErrorResponse)
}
