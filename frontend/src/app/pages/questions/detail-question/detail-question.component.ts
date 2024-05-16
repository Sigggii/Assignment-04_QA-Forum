import { Component, inject, input } from '@angular/core'
import { QuestionComponent } from './components/question/question.component'
import { AnswerEditorComponent } from './components/answer-editor/answer-editor.component'
import { ReactiveFormsModule } from '@angular/forms'
import { BackendService } from '../../../core/services/backend.service'
import { CreateAnswer } from '../../../shared/types/api-types'
import { AnswerComponent } from './components/answer/answer.component'
import { NgClass, NgIf } from '@angular/common'
import { AuthService } from '../../../core/services/auth.service'

@Component({
    selector: 'app-detail-question',
    standalone: true,
    imports: [
        QuestionComponent,
        AnswerEditorComponent,
        ReactiveFormsModule,
        AnswerComponent,
        NgClass,
        NgIf,
    ],
    templateUrl: './detail-question.component.html',
    styleUrl: './detail-question.component.css',
})
export class DetailQuestionComponent {
    questionId = input<string>('')
    questionQuery = this.backendService.fetchQuestion(this.questionId)
    createAnswer = this.backendService.createAnswer()
    answerEditorSticky: boolean = false
    authService = inject(AuthService)

    constructor(private backendService: BackendService) {}

    handleCreateAnswer = (answer: CreateAnswer) => {
        this.createAnswer.mutate({
            questionId: this.questionId(),
            answer: answer,
        })
    }

    handleAnswerEditorSticky = (isSticky: boolean) => {
        this.answerEditorSticky = isSticky
    }
}
