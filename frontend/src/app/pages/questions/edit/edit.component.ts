import { Component, inject, input } from '@angular/core'
import { QuestionEditorComponent } from '../question-editor/question-editor.component'
import { BackendService } from '../../../core/services/backend.service'
import { NavigationService } from '../../../core/services/navigation.service'
import { CreateQuestionRequest } from '../../../shared/types/api-types'
import { AuthService } from '../../../core/services/auth.service'

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
    navService = inject(NavigationService)
    questionQuery = this.backendService.fetchQuestion(this.questionId)
    updateQuestion = this.backendService.updateQuestion(
        async () => await this.navService.openQuestion(this.questionId())
    )

    handleUpdateQuestion = (question: CreateQuestionRequest) => {
        const authorId = this.questionQuery.data()?.authorId
        if (!authorId) {
            throw new Error('No Question loaded')
        }
        this.updateQuestion.mutate({
            questionId: this.questionId(),
            question: {
                ...question,
                question: {
                    ...question.question,
                    authorId: authorId,
                },
            },
        })
    }

    handleCancelEdit = async () => {
        await this.navService.openQuestion(this.questionId())
    }
}
