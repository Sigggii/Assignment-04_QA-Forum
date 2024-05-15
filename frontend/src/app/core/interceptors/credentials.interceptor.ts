import { HttpInterceptorFn } from '@angular/common/http'

/**
 * Add withCredentials: true header to every request
 * @param req
 * @param next
 */
export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
    const reqCopy = req.clone({ withCredentials: true })
    return next(reqCopy)
}
