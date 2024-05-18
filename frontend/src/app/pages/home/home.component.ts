import { Component, computed, inject, signal } from '@angular/core'
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm'
import { NavigationService } from '../../core/services/navigation.service'
import { RouterLink } from '@angular/router'
import { NgIf } from '@angular/common'
import { AuthService } from '../../core/services/auth.service'
import { HeroSectionComponent } from './components/hero-section/hero-section.component'
import { CreateQueryResult } from '@tanstack/angular-query-experimental'
import { QuestionPreviewData } from '../../shared/types/api-types'
import { BackendService } from '../../core/services/backend.service'
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm'
import { QuestionPreviewComponent } from '../../shared/components/question-preview/question-preview.component'

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        HlmButtonDirective,
        RouterLink,
        NgIf,
        HeroSectionComponent,
        HlmSpinnerComponent,
        QuestionPreviewComponent,
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent {
    navigationService = inject(NavigationService)
    authService = inject(AuthService)
    backendService = inject(BackendService)

    questionQuery: CreateQueryResult<QuestionPreviewData[]> =
        this.backendService.fetchQuestions(signal(''))

    // sort by score
    questions = computed(() =>
        // get 10 questions with the highest score
        (this.questionQuery.data() ?? [])
            .sort((q1, q2) => q2.score - q1.score)
            .slice(0, 10)
    )
}
