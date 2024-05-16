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

    isQueryFinished = async (): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            const intervalId = setInterval(() => {
                const status = this.userInfo.status()
                if (status !== 'pending') {
                    clearInterval(intervalId)
                    resolve(true)
                }
            }, 100)

            setTimeout(() => {
                clearInterval(intervalId)
                reject(new Error('Timeout waiting for status change'))
            }, 5000) // Adjust timeout as needed
        })
    }

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
