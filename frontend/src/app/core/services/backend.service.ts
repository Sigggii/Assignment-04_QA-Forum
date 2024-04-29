import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { CreateQuestionRequest } from '@/shared/types'
import { environment } from '../../../environments/environment'

@Injectable({
    providedIn: 'root',
})
export class BackendService {
    constructor(private http: HttpClient) {}

    createQuestions(question: CreateQuestionRequest) {
        this.http.post(`${environment.apiUrl}questions`, question).subscribe()
    }
}
