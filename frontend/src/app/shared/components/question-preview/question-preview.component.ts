import { Component, Input } from '@angular/core'
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm'
import { TagBadgeComponent } from '../tag-badge/tag-badge.component'
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm'
import { UserBadgeComponent } from '../user-badge/user-badge.component'
import { formatDateXTimeAgo } from '../../utils/date-utils'
import { ScoreBadgeComponent } from '../score-badge/score-badge.component'
import { AnswerCountBadgeComponent } from '../answer-count-badge/answer-count-badge.component'
import { AnswerRatingBadgeComponent } from '../answer-rating-badge/answer-rating-badge.component'

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
    ],
    templateUrl: './question-preview.component.html',
    styleUrl: './question-preview.component.css',
})
export class QuestionPreviewComponent {
    @Input() question = {
        id: 'id',
        tags: ['angular', 'javascript'],
        title: 'What is Angular?',
        content:
            'I have been hearing a lot about Angular, but I am not sure what it is. Can someone explain it to me?',
        createdAt: new Date(),

        score: 4,
        commentCount: 2,
        rating: 4.1,

        author: {
            username: 'Username',
            role: 'NOOB',
        },
    } //TODO: Add real type and data
    protected readonly formatDateXTimeAgo = formatDateXTimeAgo
}
