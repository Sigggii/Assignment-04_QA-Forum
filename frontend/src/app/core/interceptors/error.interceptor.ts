import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http'
import { toast } from 'ngx-sonner'
import { tap } from 'rxjs'

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    return next(req).pipe(
        tap({
            error: (err: HttpErrorResponse) => {
                if (err.error.status && err.error.displayMessage) {
                    toast(`${err.error.status} | ${err.error.displayMessage}`)
                } else {
                    toast('Unknown HTTP Error')
                }
            },
        })
    )
}
