import { ErrorResponse } from './errorHandler'

/**
 * Contains Error Payload to send back to client (caught by Error Handler)
 */
export class ResponseError extends Error {
    //Payload to send back to client
    payload: ErrorResponse
    constructor(error: ErrorResponse) {
        super()
        this.payload = error
    }
}
