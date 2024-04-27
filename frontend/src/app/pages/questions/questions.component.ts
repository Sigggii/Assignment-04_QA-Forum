import { Component } from '@angular/core'
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm'
import { QuestionPreviewComponent } from '../../shared/components/question-preview/question-preview.component'

@Component({
    selector: 'app-questions',
    standalone: true,
    imports: [HlmButtonDirective, QuestionPreviewComponent],
    templateUrl: './questions.component.html',
    styleUrl: './questions.component.css',
})
export class QuestionsComponent {}
