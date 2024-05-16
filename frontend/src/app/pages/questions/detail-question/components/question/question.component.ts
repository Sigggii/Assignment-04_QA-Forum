import { Component, inject, Input, signal } from '@angular/core'
import { ScorePostComponent } from '../../../../../shared/components/score-post/score-post.component'
import { UserBadgeComponent } from '../../../../../shared/components/user-badge/user-badge.component'
import { formatDateXTimeAgo } from '../../../../../shared/utils/date-utils'
import { TagBadgeComponent } from '../../../../../shared/components/tag-badge/tag-badge.component'
import { NgClass, NgIf } from '@angular/common'
import { DetailQuestion } from '../../../../../shared/types/api-types'
import { CommentsComponent } from '../comments/comments.component'
import { AuthService } from '../../../../../core/services/auth.service'
import { RouterLink } from '@angular/router'
import { BackendService } from '../../../../../core/services/backend.service'
import { NavigationService } from '../../../../../core/services/navigation.service'
import {
    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogFooterComponent,
    HlmDialogHeaderComponent,
    HlmDialogTitleDirective,
} from '@spartan-ng/ui-dialog-helm'
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm'
import {
    BrnDialogContentDirective,
    BrnDialogTriggerDirective,
} from '@spartan-ng/ui-dialog-brain'

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
        HlmDialogComponent,
        HlmDialogContentComponent,
        HlmDialogHeaderComponent,
        HlmButtonDirective,
        HlmDialogFooterComponent,
        BrnDialogTriggerDirective,
        BrnDialogContentDirective,
        HlmDialogTitleDirective,
    ],
    templateUrl: './question.component.html',
    styleUrl: './question.component.css',
})
export class QuestionComponent {
    @Input({ required: true }) question!: DetailQuestion
    navService = inject(NavigationService)
    authService = inject(AuthService)
    backendService = inject(BackendService)
    deleteQuestion = this.backendService.deleteQuestion(
        async () => await this.navService.openQuestions()
    )
    deleteDialogOpen = signal<'open' | 'closed'>('closed')

    handleDeleteQuestion = () => {
        this.deleteQuestion.mutate(this.question.id)
    }

    protected readonly formatDateXTimeAgo = formatDateXTimeAgo
}
