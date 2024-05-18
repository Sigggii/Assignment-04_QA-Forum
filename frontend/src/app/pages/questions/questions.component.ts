import { Component, computed, inject } from '@angular/core'
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm'
import { QuestionPreviewComponent } from '../../shared/components/question-preview/question-preview.component'
import { BackendService } from '../../core/services/backend.service'
import { CreateQueryResult } from '@tanstack/angular-query-experimental'
import { QuestionPreviewData } from '../../shared/types/api-types'
import { NavigationService } from '../../core/services/navigation.service'
import { AuthService } from '../../core/services/auth.service'
import { NgIf } from '@angular/common'
import { SearchComponent } from '../../shared/components/search/search.component'
import { SearchService } from '../../core/services/search.service'
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm'

@Component({
    selector: 'app-questions',
    standalone: true,
    imports: [
        HlmButtonDirective,
        QuestionPreviewComponent,
        NgIf,
        SearchComponent,
        HlmSpinnerComponent,
    ],
    templateUrl: './questions.component.html',
    styleUrl: './questions.component.css',
})
export class QuestionsComponent {
    backendService = inject(BackendService)
    navigationService = inject(NavigationService)
    authService = inject(AuthService)
    searchService = inject(SearchService)

    questionQuery: CreateQueryResult<QuestionPreviewData[]> =
        this.backendService.fetchQuestions(this.searchService.query)

    questions = computed(() => this.questionQuery.data()?.filter(() => true)) //TODO: do filtering here
}
