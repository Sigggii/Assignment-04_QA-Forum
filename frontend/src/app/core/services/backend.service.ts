import { inject, Injectable, InputSignal } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'

import {
    CreateAnswer,
    CreateAnswerComment,
    CreateQuestionComment,
    CreateQuestionRequest,
    DetailQuestion,
    Question,
    QuestionPreviewData,
    LoginUser,
    JWTPayload,
} from '../../shared/types/api-types'
import {
    injectMutation,
    injectQuery,
    injectQueryClient,
} from '@tanstack/angular-query-experimental'
import { lastValueFrom } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class BackendService {
    http = inject(HttpClient)
    queryClient = injectQueryClient()

    createQuestion = (redirect?: (questionId: string) => Promise<void>) =>
        injectMutation(() => ({
            mutationFn: async (question: CreateQuestionRequest) =>
                lastValueFrom(
                    this.http.post<Question>(
                        `${environment.apiUrl}questions`,
                        question
                    )
                ),
            onSuccess: async data => {
                await this.queryClient.invalidateQueries({
                    queryKey: ['questions'],
                })
                if (redirect) {
                    await redirect(data.id)
                }
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

    //Todo currently, only all question requests can be invalidatet. Trying to set the
    // questionId as additional queryKey didnt work yet. If time left figure out what the
    // problem is
    fetchQuestion = (questionId: InputSignal<string>) =>
        injectQuery(() => ({
            enabled: !!questionId && questionId().trim() !== '',
            queryKey: ['question', questionId()],
            queryFn: () =>
                lastValueFrom(
                    this.http.get<DetailQuestion>(
                        `${environment.apiUrl}questions/${questionId()}`
                    )
                ),
        }))

    createQuestionComment = () =>
        injectMutation(() => ({
            mutationFn: async (req: {
                questionId: string
                comment: CreateQuestionComment
            }) =>
                lastValueFrom(
                    this.http.post(
                        `${environment.apiUrl}questions/${req.questionId}/comments`,
                        req.comment
                    )
                ),
            onSuccess: async () => {
                await this.queryClient.invalidateQueries({
                    queryKey: ['questions'],
                })
                await this.queryClient.invalidateQueries({
                    queryKey: ['question'],
                })
            },
        }))

    createAnswerComment = () =>
        injectMutation(() => ({
            mutationFn: async (req: {
                questionId: string
                answerId: string
                comment: CreateAnswerComment
            }) =>
                lastValueFrom(
                    this.http.post(
                        `${environment.apiUrl}questions/${req.questionId}/answers/${req.answerId}/comments`,
                        req.comment
                    )
                ),
            onSuccess: async () => {
                await this.queryClient.invalidateQueries({
                    queryKey: ['questions'],
                })
                await this.queryClient.invalidateQueries({
                    queryKey: ['question'],
                })
            },
        }))

    createAnswer = () =>
        injectMutation(() => ({
            mutationFn: async (req: {
                answer: CreateAnswer
                questionId: string
            }) =>
                lastValueFrom(
                    this.http.post(
                        `${environment.apiUrl}questions/${req.questionId}/answers`,
                        req.answer
                    )
                ),
            onSuccess: async () => {
                await this.queryClient.invalidateQueries({
                    queryKey: ['questions'],
                })
                await this.queryClient.invalidateQueries({
                    queryKey: ['question'],
                })
            },
        }))

    registerUser = () =>
        injectMutation(() => ({
            mutationFn: async (req: {
                user: LoginUser
                type: 'noob' | 'pro'
            }) =>
                lastValueFrom(
                    this.http.post(
                        `${environment.apiUrl}auth/register/${req.type}`,
                        req.user
                    )
                ),
            onSuccess: async () => {
                await this.queryClient.invalidateQueries({
                    queryKey: ['userInfo'],
                })
            },
        }))

    loginUser = () =>
        injectMutation(() => ({
            mutationFn: async (user: LoginUser) =>
                lastValueFrom(
                    this.http.post(`${environment.apiUrl}auth/login`, user)
                ),
            onSuccess: async () => {
                await this.queryClient.invalidateQueries({
                    queryKey: ['userInfo'],
                })
            },
        }))

    logoutUser = () =>
        injectMutation(() => ({
            mutationFn: async () =>
                lastValueFrom(
                    this.http.post(`${environment.apiUrl}auth/logout`, null)
                ),
            onSuccess: async () => {
                await this.queryClient.invalidateQueries({
                    queryKey: ['userInfo'],
                })
            },
        }))

    fetchUserInformation = () =>
        injectQuery<JWTPayload | undefined>(() => ({
            queryKey: ['userInfo'],
            queryFn: async () =>
                lastValueFrom(
                    this.http.get<JWTPayload | undefined>(
                        `${environment.apiUrl}auth/me`
                    )
                ),
        }))
}
