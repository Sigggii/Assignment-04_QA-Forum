import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

@Injectable({
    providedIn: 'root',
})
export class NavigationService {
    constructor(private router: Router) {}

    openQuestion = async (questionId: string) => {
        await this.router.navigate(['/questions', questionId])
    }

    openAskQuestion = async () => {
        await this.router.navigate(['/questions/ask'])
    }
}
