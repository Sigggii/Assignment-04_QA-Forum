import { getConfig } from '../system/EnvManager'
import jwt from 'jsonwebtoken'
import { JWTPayload } from '../shared/types'

export const authenticationHandler = (req: any, resp: any, done: any) => {
    const jwtCookie = req.cookies.jwt
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

export const authorizationHandler = (req: any, resp: any, done: any) => {
    const allowedRoles = req.routeOptions.config.rolesAllowed

    if (
        allowedRoles &&
        req.authUser &&
        (allowedRoles === 'ALL' || allowedRoles.includes(req.authUser.role))
    ) {
        return done()
    }
    resp.status(401).send(new Error('Unauthorized'))
}
