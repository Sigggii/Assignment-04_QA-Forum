import {
    Component,
    EventEmitter,
    inject,
    Input,
    Output,
    signal,
} from '@angular/core'
import { formatDateXTimeAgo } from '../../../../../shared/utils/date-utils'
import { CommentsComponent } from '../comments/comments.component'
import { ScorePostComponent } from '../../../../../shared/components/score-post/score-post.component'
import { TagBadgeComponent } from '../../../../../shared/components/tag-badge/tag-badge.component'
import { UserBadgeComponent } from '../../../../../shared/components/user-badge/user-badge.component'
import { NgClass, NgIf } from '@angular/common'
import { Answer } from '../../../../../shared/types/api-types'
import { RateAnswerComponent } from '../../../../../shared/components/rate-answer/rate-answer.component'
import { RouterLink } from '@angular/router'
import { AuthService } from '../../../../../core/services/auth.service'
import { BackendService } from '../../../../../core/services/backend.service'
import { BrnDialogContentDirective } from '@spartan-ng/ui-dialog-brain'
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm'
import {
    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogFooterComponent,
    HlmDialogHeaderComponent,
    HlmDialogTitleDirective,
} from '@spartan-ng/ui-dialog-helm'

@Component({
    selector: 'app-answer',
    standalone: true,
    imports: [
        CommentsComponent,
        ScorePostComponent,
        TagBadgeComponent,
        UserBadgeComponent,
        NgClass,
        RateAnswerComponent,
        NgIf,
        RouterLink,
        BrnDialogContentDirective,
        HlmButtonDirective,
        HlmDialogComponent,
        HlmDialogContentComponent,
        HlmDialogFooterComponent,
        HlmDialogHeaderComponent,
        HlmDialogTitleDirective,
    ],
    templateUrl: './answer.component.html',
    styleUrl: './answer.component.css',
})
export class AnswerComponent {
    @Input({ required: true }) answer!: Answer
    @Output() edit: EventEmitter<Answer> = new EventEmitter<Answer>()
    authService = inject(AuthService)
    backendService = inject(BackendService)
    deleteAnswer = this.backendService.deleteAnswer()
    deleteDialogOpen = signal<'open' | 'closed'>('closed')

    handleDeleteAnswer = () => {
        this.deleteAnswer.mutate({
            questionId: this.answer.questionId,
            answerId: this.answer.id,
        })
    }
    protected readonly formatDateXTimeAgo = formatDateXTimeAgo
}
