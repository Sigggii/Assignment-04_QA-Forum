import {
    booleanAttribute,
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
import { AnswerRatingBadgeComponent } from '../../../../../shared/components/answer-rating-badge/answer-rating-badge.component'
import { heroStar } from '@ng-icons/heroicons/outline'
import { ApprovedBadgeComponent } from '../../../../../shared/components/approved-badge/approved-badge.component'

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
        AnswerRatingBadgeComponent,
        ApprovedBadgeComponent,
    ],
    providers: [provideIcons({ lucidePencil, lucideTrash, heroStar })],
    templateUrl: './answer.component.html',
    styleUrl: './answer.component.css',
})
export class AnswerComponent implements OnChanges {
    @Input({ required: true }) answer!: Answer
    @Input({ required: true }) questionAuthorId!: string
    answerId = signal<string>('')
    @Output() edit: EventEmitter<Answer> = new EventEmitter<Answer>()
    authService = inject(AuthService)
    backendService = inject(BackendService)
    deleteAnswer = this.backendService.deleteAnswer()
    createVoteAnswer = this.backendService.createVoteAnswer()
    createRatingAnswer = this.backendService.createRatingAnswer()
    approveAnswer = this.backendService.approveAnswer()

    userVoteAnswerQuery = this.backendService.fetchUserVoteForAnswer(
        this.authService.getUserData()?.id,
        this.answerId
    )

    userRatingAnswerQuery = this.backendService.fetchUserRatingForAnswer(
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

    handleRate = (rating: {
        currentRating: number | undefined
        previousRating: number | undefined
    }) => {
        // Optimistic Updates
        if (rating.currentRating) {
            if (rating.previousRating) {
                this.answer.rating =
                    (this.answer.rating * this.answer.ratingsCount +
                        (rating.currentRating - rating.previousRating)) /
                    this.answer.ratingsCount
            } else {
                this.answer.rating =
                    (this.answer.rating * this.answer.ratingsCount +
                        rating.currentRating) /
                    (this.answer.ratingsCount + 1)
            }
        } else {
            if (this.answer.ratingsCount === 1) {
                this.answer.rating = 0
                return
            }

            this.answer.rating =
                (this.answer.rating * this.answer.ratingsCount -
                    (rating.previousRating ?? 0)) /
                (this.answer.ratingsCount - 1)
        }

        this.createRatingAnswer.mutate({
            questionId: this.answer.questionId,
            answerId: this.answer.id,
            rating: { rating: rating.currentRating },
        })
    }

    handleDeleteAnswer = () => {
        this.deleteAnswer.mutate({
            questionId: this.answer.questionId,
            answerId: this.answer.id,
        })
        this.deleteDialogOpen.set('closed')
    }

    handleApproveAnswer = (approved: boolean) => {
        this.answer.approved = approved
        this.approveAnswer.mutate({
            questionId: this.answer.questionId,
            answerId: this.answer.id,
            approved: { isApproved: approved },
        })
    }

    protected readonly formatDateXTimeAgo = formatDateXTimeAgo
    protected readonly booleanAttribute = booleanAttribute
}
