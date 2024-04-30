import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { CreateQuestionRequest } from '@/shared/types'
import { environment } from '../../../environments/environment'
import { QuestionPreviewData } from '../../shared/types/api-types'

@Injectable({
    providedIn: 'root',
})
export class BackendService {
    http = inject(HttpClient)

    createQuestions(question: CreateQuestionRequest) {
        this.http.post(`${environment.apiUrl}questions`, question).subscribe()
    }

    fetchQuestions() {
        return this.http.get<QuestionPreviewData[]>(
            `${environment.apiUrl}questions`
        )
    }
}
