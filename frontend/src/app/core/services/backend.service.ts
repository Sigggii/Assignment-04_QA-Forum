import { inject, Injectable, InputSignal, Signal } from '@angular/core'
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
    UpdateQuestionRequest,
    CreateVoteQuestion,
    CreateVoteAnswer,
    Vote,
    CreateRatingAnswer,
    Rating,
    ApproveQuestionRequest,
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

    updateQuestion = (redirect?: () => Promise<void>) =>
        injectMutation(() => ({
            mutationFn: async (req: {
                question: UpdateQuestionRequest
                questionId: string
            }) =>
                lastValueFrom(
                    this.http.put(
                        `${environment.apiUrl}questions/${req.questionId}`,
                        req.question
                    )
                ),
            onSuccess: async () => {
                await this.queryClient.invalidateQueries({
                    queryKey: ['questions'],
                })
                await this.queryClient.invalidateQueries({
                    queryKey: ['question'],
                })
                if (redirect) {
                    await redirect()
                }
            },
        }))

    deleteQuestion = (redirect?: () => Promise<void>) =>
        injectMutation(() => ({
            mutationFn: async (questionId: string) =>
                lastValueFrom(
                    this.http.delete(
                        `${environment.apiUrl}questions/${questionId}`
                    )
                ),
            onSuccess: async () => {
                await this.queryClient.invalidateQueries({
                    queryKey: ['questions'],
                })
                await this.queryClient.invalidateQueries({
                    queryKey: ['question'],
                })
                if (redirect) {
                    await redirect()
                }
            },
        }))

    fetchQuestions = (query: Signal<string>) =>
        injectQuery(() => ({
            queryKey: ['questions', `questions-${query()}`],
            queryFn: () =>
                lastValueFrom(
                    this.http.get<QuestionPreviewData[]>(
                        `${environment.apiUrl}questions`,
                        {
                            params: {
                                query: query(),
                            },
                        }
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

    updateQuestionComment = () =>
        injectMutation(() => ({
            mutationFn: async (req: {
                questionId: string
                commentId: string
                comment: CreateQuestionComment
            }) =>
                lastValueFrom(
                    this.http.put(
                        `${environment.apiUrl}questions/${req.questionId}/comments/${req.commentId}`,
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

    deleteQuestionComment = () =>
        injectMutation(() => ({
            mutationFn: async (req: {
                questionId: string
                commentId: string
            }) =>
                lastValueFrom(
                    this.http.delete(
                        `${environment.apiUrl}questions/${req.questionId}/comments/${req.commentId}`
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

    createVoteQuestion = () =>
        injectMutation(() => ({
            mutationFn: async (req: {
                questionId: string
                vote: CreateVoteQuestion
            }) =>
                lastValueFrom(
                    this.http.post(
                        `${environment.apiUrl}questions/${req.questionId}/vote`,
                        req.vote
                    )
                ),
            onSuccess: async () => {
                await this.queryClient.invalidateQueries({
                    queryKey: ['questions'],
                })
                await this.queryClient.invalidateQueries({
                    queryKey: ['question'],
                })
                await this.queryClient.invalidateQueries({
                    queryKey: ['userVoteQuestion'],
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

    updateAnswerComment = () =>
        injectMutation(() => ({
            mutationFn: async (req: {
                questionId: string
                answerId: string
                commentId: string
                comment: CreateAnswerComment
            }) =>
                lastValueFrom(
                    this.http.put(
                        `${environment.apiUrl}questions/${req.questionId}/answers/${req.answerId}/comments/${req.commentId}`,
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

    deleteAnswerComment = () =>
        injectMutation(() => ({
            mutationFn: async (req: {
                questionId: string
                answerId: string
                commentId: string
            }) =>
                lastValueFrom(
                    this.http.delete(
                        `${environment.apiUrl}questions/${req.questionId}/answers/${req.answerId}/comments/${req.commentId}`
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

    updateAnswer = () =>
        injectMutation(() => ({
            mutationFn: async (req: {
                answer: CreateAnswer
                answerId: string
                questionId: string
            }) =>
                lastValueFrom(
                    this.http.put(
                        `${environment.apiUrl}questions/${req.questionId}/answers/${req.answerId}`,
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

    deleteAnswer = () =>
        injectMutation(() => ({
            mutationFn: async (req: { answerId: string; questionId: string }) =>
                lastValueFrom(
                    this.http.delete(
                        `${environment.apiUrl}questions/${req.questionId}/answers/${req.answerId}`
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

    approveAnswer = () =>
        injectMutation(() => ({
            mutationFn: async (req: {
                approved: ApproveQuestionRequest
                answerId: string
                questionId: string
            }) =>
                lastValueFrom(
                    this.http.put(
                        `${environment.apiUrl}questions/${req.questionId}/answers/${req.answerId}/approve`,
                        req.approved
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

    createVoteAnswer = () =>
        injectMutation(() => ({
            mutationFn: async (req: {
                questionId: string
                answerId: string
                vote: CreateVoteAnswer
            }) =>
                lastValueFrom(
                    this.http.post(
                        `${environment.apiUrl}questions/${req.questionId}/answers/${req.answerId}/vote`,
                        req.vote
                    )
                ),
            onSuccess: async () => {
                await this.queryClient.invalidateQueries({
                    queryKey: ['questions'],
                })
                await this.queryClient.invalidateQueries({
                    queryKey: ['question'],
                })
                await this.queryClient.invalidateQueries({
                    queryKey: ['userVoteAnswer'],
                })
            },
        }))

    createRatingAnswer = () =>
        injectMutation(() => ({
            mutationFn: async (req: {
                questionId: string
                answerId: string
                rating: CreateRatingAnswer
            }) =>
                lastValueFrom(
                    this.http.post(
                        `${environment.apiUrl}questions/${req.questionId}/answers/${req.answerId}/rate`,
                        req.rating
                    )
                ),
            onSuccess: async () => {
                await this.queryClient.invalidateQueries({
                    queryKey: ['questions'],
                })
                await this.queryClient.invalidateQueries({
                    queryKey: ['question'],
                })
                await this.queryClient.invalidateQueries({
                    queryKey: ['userRatingAnswer'],
                })
            },
        }))

    registerUser = (onSuccess?: () => Promise<void>) =>
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
                if (onSuccess) {
                    await onSuccess()
                }
            },
        }))

    loginUser = (onSuccess?: () => Promise<void>) =>
        injectMutation(() => ({
            mutationFn: async (user: LoginUser) =>
                lastValueFrom(
                    this.http.post(`${environment.apiUrl}auth/login`, user)
                ),
            onSuccess: async () => {
                await this.queryClient.invalidateQueries({
                    queryKey: ['userInfo'],
                })
                if (onSuccess) {
                    await onSuccess()
                }
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

    fetchUserVoteForQuestion = (
        userId: string | undefined,
        questionId: Signal<string>
    ) =>
        injectQuery<Vote>(() => ({
            queryKey: ['userVoteQuestion', userId, questionId()],
            enabled:
                questionId().trim() !== '' && !!userId && userId.trim() !== '',
            queryFn: async () =>
                lastValueFrom(
                    this.http.get<Vote>(
                        `${environment.apiUrl}users/${userId}/vote-question?questionId=${questionId()}`
                    )
                ),
        }))

    fetchUserVoteForAnswer = (
        userId: string | undefined,
        answerId: Signal<string>
    ) =>
        injectQuery<Vote>(() => ({
            queryKey: ['userVoteAnswer', userId, answerId()],
            enabled:
                answerId().trim() !== '' && !!userId && userId.trim() !== '',
            queryFn: async () =>
                lastValueFrom(
                    this.http.get<Vote>(
                        `${environment.apiUrl}users/${userId}/vote-answer?answerId=${answerId()}`
                    )
                ),
        }))

    fetchUserRatingForAnswer = (
        userId: string | undefined,
        answerId: Signal<string>
    ) =>
        injectQuery<Rating>(() => ({
            queryKey: ['userRatingAnswer', userId, answerId()],
            enabled:
                answerId().trim() !== '' && !!userId && userId.trim() !== '',
            queryFn: async () =>
                lastValueFrom(
                    this.http.get<Rating>(
                        `${environment.apiUrl}users/${userId}/rating-answer?answerId=${answerId()}`
                    )
                ),
        }))
}
