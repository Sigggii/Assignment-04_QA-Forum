import { Component, inject, Input } from '@angular/core'
import { ScorePostComponent } from '../../../../../shared/components/score-post/score-post.component'
import { UserBadgeComponent } from '../../../../../shared/components/user-badge/user-badge.component'
import { formatDateXTimeAgo } from '../../../../../shared/utils/date-utils'
import { TagBadgeComponent } from '../../../../../shared/components/tag-badge/tag-badge.component'
import { NgClass, NgIf } from '@angular/common'
import { DetailQuestion } from '../../../../../shared/types/api-types'
import { CommentsComponent } from '../comments/comments.component'
import { AuthService } from '../../../../../core/services/auth.service'
import { RouterLink } from '@angular/router'

@Component({
    selector: 'app-question',
    standalone: true,
    imports: [
        ScorePostComponent,
        UserBadgeComponent,
        TagBadgeComponent,
        NgClass,
        CommentsComponent,
        NgIf,
        RouterLink,
    ],
    templateUrl: './question.component.html',
    styleUrl: './question.component.css',
})
export class QuestionComponent {
    @Input({ required: true }) question!: DetailQuestion
    authService = inject(AuthService)

    protected readonly formatDateXTimeAgo = formatDateXTimeAgo
}
