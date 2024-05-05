import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

@Injectable({
    providedIn: 'root',
})
export class NavigationService {
    constructor(private router: Router) {}

    openQuestion = async (questionId: string) => {
        console.log('Test')
        await this.router.navigate(['/questions', questionId])
    }
}
