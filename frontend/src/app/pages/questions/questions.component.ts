import { Component, inject, OnInit } from '@angular/core'
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm'
import { QuestionPreviewComponent } from '../../shared/components/question-preview/question-preview.component'
import { BackendService } from '../../core/services/backend.service'
import { QuestionPreviewData } from '../../shared/types/api-types'

@Component({
    selector: 'app-questions',
    standalone: true,
    imports: [HlmButtonDirective, QuestionPreviewComponent],
    templateUrl: './questions.component.html',
    styleUrl: './questions.component.css',
})
export class QuestionsComponent implements OnInit {
    backendService = inject(BackendService)

    data: QuestionPreviewData[] = []

    ngOnInit(): void {
        this.backendService.fetchQuestions().subscribe(data => {
            this.data = data
        })
    }
}
