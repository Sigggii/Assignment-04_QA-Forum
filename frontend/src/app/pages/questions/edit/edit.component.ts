import { Component, inject, input } from '@angular/core'
import { QuestionEditorComponent } from '../question-editor/question-editor.component'
import { BackendService } from '../../../core/services/backend.service'

@Component({
    selector: 'app-edit',
    standalone: true,
    imports: [QuestionEditorComponent],
    templateUrl: './edit.component.html',
    styleUrl: './edit.component.css',
})
export class EditComponent {
    questionId = input<string>('')
    backendService = inject(BackendService)
    questionQuery = this.backendService.fetchQuestion(this.questionId)
}
