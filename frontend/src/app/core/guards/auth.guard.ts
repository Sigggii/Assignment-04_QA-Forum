import { CanActivateFn, Router } from '@angular/router'
import { computed, inject } from '@angular/core'
import { AuthService } from '../services/auth.service'
import { Role } from '../../shared/types/api-types'

export const authGuard =
    (allowedRoles: Role[]): CanActivateFn =>
    (route, state) => {
        const authService = inject(AuthService)
        const router = inject(Router)
        const allowRoute = computed(() => {
            return (
                authService.isLoggedIn() &&
                authService.getUserData()?.role &&
                allowedRoles.includes(authService.getUserData()!.role)
            )
        })
        if (allowRoute()) return true

        return router.createUrlTree(['/login'])
    }
