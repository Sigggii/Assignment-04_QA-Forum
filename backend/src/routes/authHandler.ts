import { getConfig } from '../system/EnvManager'
import jwt from 'jsonwebtoken'
import { JWTPayload } from '../shared/types'
import { FastifyReply, FastifyRequest } from 'fastify'
import { ResponseError } from './errorHandling/ResponseError'

export const authenticationHandler = (
    req: FastifyRequest,
    rep: FastifyReply,
    done: (err?: Error) => void,
) => {
    const jwtCookie = req.cookies['jwt']
    if (jwtCookie) {
        const jwtSecret = getConfig().JWT_SECRET
        try {
            req.authUser = jwt.verify(jwtCookie, jwtSecret) as JWTPayload
        } catch (err) {
            req.authUser = undefined
        }
    }
    done()
}

export const authorizationHandler = (
    req: FastifyRequest,
    rep: FastifyReply,
    done: (err?: Error) => void,
) => {
    const allowedRoles = req.routeOptions.config['rolesAllowed']

    if (
        allowedRoles &&
        req.authUser &&
        (allowedRoles === 'ALL' || allowedRoles.includes(req.authUser.role))
    ) {
        return done()
    }

    throw new ResponseError({ status: 403, displayMessage: 'Not Authorized', errors: [] })
}

export const AuthorizedByUserIdGuard = (
    jwtPayload: JWTPayload,
    toCheckId: string,
    isAdminAllowed: boolean,
) => {
    //if admin allowed and user admin, allow
    if (isAdminAllowed && jwtPayload.role === 'ADMIN') return
    if (jwtPayload.id !== toCheckId) {
        throw new ResponseError({ status: 401, displayMessage: 'Unauthorized', errors: [] })
    }
    new ResponseError({ status: 403, displayMessage: 'Unauthorized', errors: [] })
}
