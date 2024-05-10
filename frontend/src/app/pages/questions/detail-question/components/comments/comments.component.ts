import { Component, Input } from '@angular/core'
import { NgIf } from '@angular/common'
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
    ],
    templateUrl: './comments.component.html',
    styleUrl: './comments.component.css',
})
export class CommentsComponent {
    @Input({ required: true }) comments: (
        | CommentOnAnswer
        | CommentOnQuestion
    )[] = []
    @Input({ required: true }) type!: CommentSectionType
    @Input({ required: true }) questionId!: string
    @Input() answerId: string | undefined = undefined

    newComment: string = ''

    constructor(private backendService: BackendService) {}

    createQuestionComment = this.backendService.createQuestionComment()
    createAnswerComment = this.backendService.createAnswerComment()

    handleNewCommentInput = (event: Event) => {
        const textArea = event.target as HTMLTextAreaElement
        const value = textArea.value
        const newText = value.replaceAll('\n', '').replaceAll('\r', '')
        console.log(newText)
        this.newComment = newText
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
}
