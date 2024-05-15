import { computed, inject, Injectable } from '@angular/core'
import { BackendService } from './backend.service'
import { CreateQueryResult } from '@tanstack/angular-query-experimental'
import { JWTPayload } from '../../shared/types/api-types'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor() {}

    private backendService = inject(BackendService)
    private userInfo = this.backendService.fetchUserInformation()

    isLoggedIn = () => {
        return !!this.userInfo.data()
    }
    isPro = (): boolean => {
        return this.userInfo.data()?.role === 'PRO'
    }

    getUserData = (): JWTPayload | undefined => {
        return this.userInfo.data()
    }
}
