import { getConfig } from '../system/EnvManager'
import jwt from 'jsonwebtoken'
import { JWTPayload } from '../shared/types'
import { FastifyReply, FastifyRequest } from 'fastify'

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
    //TODO: use custom error with 401 code
    done(new Error('Unauthorized'))
}
