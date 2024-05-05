import {
    Component,
    input,
    Input,
    OnChanges,
    signal,
    SimpleChanges,
} from '@angular/core'
import { ScorePostComponent } from '../../../../../shared/components/score-post/score-post.component'
import { UserBadgeComponent } from '../../../../../shared/components/user-badge/user-badge.component'
import { formatDateXTimeAgo } from '../../../../../shared/utils/date-utils'
import { TagBadgeComponent } from '../../../../../shared/components/tag-badge/tag-badge.component'
import { NgClass } from '@angular/common'
import { DetailQuestion, User } from '../../../../../shared/types/api-types'
import { BackendService } from '../../../../../core/services/backend.service'
import { CommentsComponent } from '../comments/comments.component'

@Component({
    selector: 'app-question',
    standalone: true,
    imports: [
        ScorePostComponent,
        UserBadgeComponent,
        TagBadgeComponent,
        NgClass,
        CommentsComponent,
    ],
    templateUrl: './question.component.html',
    styleUrl: './question.component.css',
})
export class QuestionComponent {
    @Input({ required: true }) question!: DetailQuestion
    protected readonly formatDateXTimeAgo = formatDateXTimeAgo
}
