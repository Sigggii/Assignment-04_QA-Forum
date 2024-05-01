import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import {
    DetailQuestion,
    QuestionPreviewData,
} from '../../shared/types/api-types'
import {
    injectMutation,
    injectQuery,
    injectQueryClient,
} from '@tanstack/angular-query-experimental'
import { lastValueFrom } from 'rxjs'

export type CreateQuestionRequest = {
    question: { title: string; content: string }
    tags: { name: string }[]
}

@Injectable({
    providedIn: 'root',
})
export class BackendService {
    private http = inject(HttpClient)
    private queryClient = injectQueryClient()

    createQuestion = () =>
        injectMutation(() => ({
            mutationFn: async (question: CreateQuestionRequest) =>
                this.http
                    .post(`${environment.apiUrl}questions`, question)
                    .subscribe(),
            onSuccess: () => {
                this.queryClient.invalidateQueries({ queryKey: ['questions'] })
            },
        }))

    fetchQuestions = () =>
        injectQuery(() => ({
            queryKey: ['questions'],
            queryFn: () =>
                lastValueFrom(
                    this.http.get<QuestionPreviewData[]>(
                        `${environment.apiUrl}questions`
                    )
                ),
        }))

    fetchQuestion = (questionId: string) =>
        injectQuery(() => ({
            queryKey: ['questions', questionId],
            queryFn: () =>
                lastValueFrom(
                    this.http.get<DetailQuestion>(
                        `${environment.apiUrl}questions/${questionId}`
                    )
                ),
        }))
}
