import { Component, Input } from '@angular/core'
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm'
import { TagBadgeComponent } from '../tag-badge/tag-badge.component'
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm'
import { UserBadgeComponent } from '../user-badge/user-badge.component'
import { formatDateXTimeAgo } from '../../utils/date-utils'
import { ScoreBadgeComponent } from '../score-badge/score-badge.component'
import { AnswerCountBadgeComponent } from '../answer-count-badge/answer-count-badge.component'
import { AnswerRatingBadgeComponent } from '../answer-rating-badge/answer-rating-badge.component'
import { QuestionPreviewData } from '../../types/api-types'
import { RouterLink } from '@angular/router'

@Component({
    selector: 'app-question-preview',
    standalone: true,
    imports: [
        HlmBadgeDirective,
        TagBadgeComponent,
        HlmIconComponent,
        UserBadgeComponent,
        ScoreBadgeComponent,
        AnswerCountBadgeComponent,
        AnswerRatingBadgeComponent,
        RouterLink,
    ],
    templateUrl: './question-preview.component.html',
    styleUrl: './question-preview.component.css',
})
export class QuestionPreviewComponent {
    @Input({ required: true }) question!: QuestionPreviewData

    protected readonly formatDateXTimeAgo = formatDateXTimeAgo
}
