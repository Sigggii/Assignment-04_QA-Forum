import { Component, computed, inject } from '@angular/core'
import { HeroSectionComponent } from '../../home/components/hero-section/hero-section.component'
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm'
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm'
import { QuestionPreviewComponent } from '../../../shared/components/question-preview/question-preview.component'
import { NavigationService } from '../../../core/services/navigation.service'
import { BackendService } from '../../../core/services/backend.service'
import { CreateQueryResult } from '@tanstack/angular-query-experimental'
import { QuestionPreviewData } from '../../../shared/types/api-types'

@Component({
    selector: 'app-my-questions',
    standalone: true,
    imports: [
        HeroSectionComponent,
        HlmButtonDirective,
        HlmSpinnerComponent,
        QuestionPreviewComponent,
    ],
    templateUrl: './my-questions.component.html',
    styleUrl: './my-questions.component.css',
})
export class MyQuestionsComponent {
    navigationService = inject(NavigationService)
    backendService = inject(BackendService)

    questionQuery: CreateQueryResult<QuestionPreviewData[]> =
        this.backendService.fetchMyQuestions()

    // sort by date
    questions = computed(() =>
        (this.questionQuery.data() ?? []).sort(
            (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
        )
    )
}
