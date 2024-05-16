import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

@Injectable({
    providedIn: 'root',
})
export class NavigationService {
    constructor(private router: Router) {}

    openQuestions = async () => {
        await this.router.navigate(['/questions'])
    }

    openQuestion = async (questionId: string) => {
        await this.router.navigate(['/questions', questionId])
    }

    openAskQuestion = async () => {
        await this.router.navigate(['/questions/ask'])
    }

    openLogin = async () => {
        await this.router.navigate(['/login'])
    }

    openHome = async () => {
        await this.router.navigate(['/'])
    }
}
