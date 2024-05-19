import { inject, Injectable } from '@angular/core'
import { BackendService } from './backend.service'
import { JWTPayload } from '../../shared/types/api-types'
import { toObservable } from '@angular/core/rxjs-interop'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    backendService = inject(BackendService)
    userInfo = this.backendService.fetchUserInformation()
    readonly userObservable = toObservable(this.userInfo.data)

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
    isPro = () => {
        const role = this.userInfo.data()?.role
        return role !== undefined && role !== 'NOOB'
    }

    isAdmin = () => {
        return this.userInfo.data()?.role === 'ADMIN'
    }

    getUserData = (): JWTPayload | undefined => {
        return this.userInfo.data()
    }

    checkEditRights = (userId: string): boolean => {
        return this.userInfo.data()?.id === userId || this.isAdmin()
    }
}
