import { Component, inject, Input, signal } from '@angular/core'
import { NgClass, NgIf } from '@angular/common'
import { HlmInputDirective } from '@spartan-ng/ui-input-helm'
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm'
import { FormsModule } from '@angular/forms'
import { AutosizeModule } from 'ngx-autosize'
import { BackendService } from '../../../../../core/services/backend.service'
import { UserBadgeComponent } from '../../../../../shared/components/user-badge/user-badge.component'
import {
    CommentOnAnswer,
    CommentOnQuestion,
} from '../../../../../shared/types/api-types'
import { AuthService } from '../../../../../core/services/auth.service'
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm'
import { RouterLink } from '@angular/router'
import { provideIcons } from '@ng-icons/core'
import { lucidePencil, lucideTrash, lucideUser } from '@ng-icons/lucide'
import { BrnDialogContentDirective } from '@spartan-ng/ui-dialog-brain'
import {
    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogFooterComponent,
    HlmDialogHeaderComponent,
    HlmDialogTitleDirective,
} from '@spartan-ng/ui-dialog-helm'

export type CommentSectionType = 'QUESTION' | 'ANSWER'

@Component({
    selector: 'app-comments',
    standalone: true,
    imports: [
        NgIf,
        HlmInputDirective,
        HlmButtonDirective,
        FormsModule,
        AutosizeModule,
        UserBadgeComponent,
        HlmIconComponent,
        RouterLink,
        BrnDialogContentDirective,
        HlmDialogComponent,
        HlmDialogContentComponent,
        HlmDialogFooterComponent,
        HlmDialogHeaderComponent,
        HlmDialogTitleDirective,
        NgClass,
    ],
    providers: [provideIcons({ lucidePencil, lucideTrash, lucideUser })],
    templateUrl: './comments.component.html',
    styleUrl: './comments.component.css',
})
export class CommentsComponent {
    authService = inject(AuthService)
    @Input({ required: true }) comments: (
        | CommentOnAnswer
        | CommentOnQuestion
    )[] = []
    @Input({ required: true }) type!: CommentSectionType
    @Input({ required: true }) questionId!: string
    @Input() answerId: string | undefined = undefined

    deleteDialogOpen = signal<'open' | 'closed'>('closed')
    deleteCommentId: string = ''
    deleteQuestionComment = this.backendService.deleteQuestionComment()
    deleteAnswerComment = this.backendService.deleteAnswerComment()

    editCommentId: string = ''
    editComment: string = ''
    updateQuestionComment = this.backendService.updateQuestionComment()
    updateAnswerComment = this.backendService.updateAnswerComment()

    newComment: string = ''

    constructor(private backendService: BackendService) {}

    createQuestionComment = this.backendService.createQuestionComment()
    createAnswerComment = this.backendService.createAnswerComment()

    handleNewCommentInput = (event: Event) => {
        const textArea = event.target as HTMLTextAreaElement
        const value = textArea.value
        this.newComment = value.replaceAll('\n', '').replaceAll('\r', '')
    }

    handleCreateNewComment = () => {
        if (this.type === 'QUESTION') {
            this.createQuestionComment.mutate({
                questionId: this.questionId,
                comment: { content: this.newComment },
            })
        } else {
            if (!this.answerId) throw new Error('No answerId set for comment')
            this.createAnswerComment.mutate({
                questionId: this.questionId,
                answerId: this.answerId,
                comment: { content: this.newComment },
            })
        }

        this.newComment = ''
    }

    handleSetEditComment = (comment: { id: string; content: string }) => {
        this.editCommentId = comment.id
        this.editComment = comment.content
    }

    handleCancelEditComment = () => {
        this.editCommentId = ''
        this.editComment = ''
    }

    handleEditCommentInput = (event: Event) => {
        const textArea = event.target as HTMLTextAreaElement
        const value = textArea.value
        this.editComment = value.replaceAll('\n', '').replaceAll('\r', '')
    }

    handleUpdateComment = () => {
        if (this.type === 'QUESTION') {
            this.updateQuestionComment.mutate({
                questionId: this.questionId,
                commentId: this.editCommentId,
                comment: { content: this.editComment },
            })
        } else {
            if (!this.answerId) throw new Error('No answerId set for comment')
            this.updateAnswerComment.mutate({
                questionId: this.questionId,
                answerId: this.answerId,
                commentId: this.editCommentId,
                comment: { content: this.editComment },
            })
        }
        this.editComment = ''
        this.editCommentId = ''
    }

    handleOpenDeleteDialog = (commentId: string) => {
        this.deleteCommentId = commentId
        this.deleteDialogOpen.set('open')
    }

    handleDeleteComment = () => {
        if (this.type === 'QUESTION') {
            this.deleteQuestionComment.mutate({
                questionId: this.questionId,
                commentId: this.deleteCommentId,
            })
        } else {
            if (!this.answerId) throw new Error('No answerId set for comment')
            this.deleteAnswerComment.mutate({
                questionId: this.questionId,
                answerId: this.answerId,
                commentId: this.deleteCommentId,
            })
        }
        this.deleteDialogOpen.set('closed')
    }
}
