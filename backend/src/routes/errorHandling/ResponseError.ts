import { ErrorResponse } from './errorHandler'

export class ResponseError extends Error {
    payload: ErrorResponse
    constructor(error: ErrorResponse) {
        super()
        this.payload = error
    }
}
