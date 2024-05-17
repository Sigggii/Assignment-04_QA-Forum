import {
    Component,
    EventEmitter,
    inject,
    Input,
    OnChanges,
    Output,
    signal,
    SimpleChanges,
} from '@angular/core'
import { formatDateXTimeAgo } from '../../../../../shared/utils/date-utils'
import { CommentsComponent } from '../comments/comments.component'
import { ScorePostComponent } from '../../../../../shared/components/score-post/score-post.component'
import { TagBadgeComponent } from '../../../../../shared/components/tag-badge/tag-badge.component'
import { UserBadgeComponent } from '../../../../../shared/components/user-badge/user-badge.component'
import { NgClass, NgIf } from '@angular/common'
import { Answer, Vote } from '../../../../../shared/types/api-types'
import { RateAnswerComponent } from '../../../../../shared/components/rate-answer/rate-answer.component'
import { RouterLink } from '@angular/router'
import { AuthService } from '../../../../../core/services/auth.service'
import { BackendService } from '../../../../../core/services/backend.service'
import { BrnDialogContentDirective } from '@spartan-ng/ui-dialog-brain'
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm'
import { lucidePencil, lucideTrash } from '@ng-icons/lucide'
import {
    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogFooterComponent,
    HlmDialogHeaderComponent,
    HlmDialogTitleDirective,
} from '@spartan-ng/ui-dialog-helm'
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm'
import { provideIcons } from '@ng-icons/core'

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
        HlmIconComponent,
    ],
    providers: [provideIcons({ lucidePencil, lucideTrash })],
    templateUrl: './answer.component.html',
    styleUrl: './answer.component.css',
})
export class AnswerComponent implements OnChanges {
    @Input({ required: true }) answer!: Answer
    answerId = signal<string>('')
    @Output() edit: EventEmitter<Answer> = new EventEmitter<Answer>()
    authService = inject(AuthService)
    backendService = inject(BackendService)
    deleteAnswer = this.backendService.deleteAnswer()
    createVoteAnswer = this.backendService.createVoteAnswer()
    userVoteAnswerQuery = this.backendService.fetchUserVoteForAnswer(
        this.authService.getUserData()?.id,
        this.answerId
    )

    deleteDialogOpen = signal<'open' | 'closed'>('closed')

    ngOnChanges(changes: SimpleChanges) {
        if (changes['answer']) {
            this.answerId.set(this.answer.id)
        }
    }

    handleUpvote = (vote: Vote) => {
        this.createVoteAnswer.mutate({
            questionId: this.answer.questionId,
            answerId: this.answer.id,
            vote: { upvote: vote },
        })
    }

    handleDeleteAnswer = () => {
        this.deleteAnswer.mutate({
            questionId: this.answer.questionId,
            answerId: this.answer.id,
        })
        this.deleteDialogOpen.set('closed')
    }
    protected readonly formatDateXTimeAgo = formatDateXTimeAgo
}
