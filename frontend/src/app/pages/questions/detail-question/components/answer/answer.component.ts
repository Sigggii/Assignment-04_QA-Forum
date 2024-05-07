import { Component, Input } from '@angular/core'
import { formatDateXTimeAgo } from '../../../../../shared/utils/date-utils'
import { CommentsComponent } from '../comments/comments.component'
import { ScorePostComponent } from '../../../../../shared/components/score-post/score-post.component'
import { TagBadgeComponent } from '../../../../../shared/components/tag-badge/tag-badge.component'
import { UserBadgeComponent } from '../../../../../shared/components/user-badge/user-badge.component'
import { NgClass } from '@angular/common'
import { Answer } from '../../../../../shared/types/api-types'
import { RateAnswerComponent } from '../../../../../shared/components/rate-answer/rate-answer.component'

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
    ],
    templateUrl: './answer.component.html',
    styleUrl: './answer.component.css',
})
export class AnswerComponent {
    @Input({ required: true }) answer!: Answer
    protected readonly formatDateXTimeAgo = formatDateXTimeAgo
}
