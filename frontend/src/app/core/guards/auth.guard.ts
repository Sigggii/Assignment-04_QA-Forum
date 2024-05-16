import { CanActivateFn, Router, UrlTree } from '@angular/router'
import { computed, inject } from '@angular/core'
import { AuthService } from '../services/auth.service'
import { Role } from '../../shared/types/api-types'
import { Observable } from 'rxjs'

export const authGuard =
    (allowedRoles: Role[]): CanActivateFn =>
    async (route, state) => {
        const authService = inject(AuthService)
        const router = inject(Router)
        //ToDo fix this stupid solution
        await authService.isQueryFinished()
        if (
            authService.isLoggedIn() &&
            authService.getUserData()?.role &&
            allowedRoles.includes(authService.getUserData()!.role)
        )
            return true

        return router.createUrlTree(['/login'])
    }
