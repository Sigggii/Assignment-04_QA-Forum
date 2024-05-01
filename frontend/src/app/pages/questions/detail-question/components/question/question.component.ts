import { Component, Input } from '@angular/core'
import { ScorePostComponent } from '../../../../../shared/components/score-post/score-post.component'
import { UserBadgeComponent } from '../../../../../shared/components/user-badge/user-badge.component'
import { formatDateXTimeAgo } from '../../../../../shared/utils/date-utils'
import { TagBadgeComponent } from '../../../../../shared/components/tag-badge/tag-badge.component'
import { NgClass } from '@angular/common'
import { User } from '../../../../../shared/types/api-types'
import { BackendService } from '../../../../../core/services/backend.service'

@Component({
    selector: 'app-question',
    standalone: true,
    imports: [
        ScorePostComponent,
        UserBadgeComponent,
        TagBadgeComponent,
        NgClass,
    ],
    templateUrl: './question.component.html',
    styleUrl: './question.component.css',
})
export class QuestionComponent {
    @Input() questionId: string = ''
    constructor(private backendService: BackendService) {}
    questionQuery = this.backendService.fetchQuestion(
        '4c373274-905a-4833-94eb-72441778ad9d'
    )

    protected readonly formatDateXTimeAgo = formatDateXTimeAgo
}
