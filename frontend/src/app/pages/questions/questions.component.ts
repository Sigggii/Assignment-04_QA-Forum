import { Component, inject } from '@angular/core'
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm'
import { QuestionPreviewComponent } from '../../shared/components/question-preview/question-preview.component'
import { BackendService } from '../../core/services/backend.service'
import { CreateQueryResult } from '@tanstack/angular-query-experimental'
import { QuestionPreviewData } from '../../shared/types/api-types'

@Component({
    selector: 'app-questions',
    standalone: true,
    imports: [HlmButtonDirective, QuestionPreviewComponent],
    templateUrl: './questions.component.html',
    styleUrl: './questions.component.css',
})
export class QuestionsComponent {
    backendService = inject(BackendService)

    questionQuery: CreateQueryResult<QuestionPreviewData[]> =
        this.backendService.fetchQuestions()
}
