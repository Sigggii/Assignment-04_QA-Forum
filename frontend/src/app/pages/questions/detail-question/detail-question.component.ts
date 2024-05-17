import { Component, ElementRef, inject, input, ViewChild } from '@angular/core'
import { QuestionComponent } from './components/question/question.component'
import { AnswerEditorComponent } from './components/answer-editor/answer-editor.component'
import { ReactiveFormsModule } from '@angular/forms'
import { BackendService } from '../../../core/services/backend.service'
import { Answer, CreateAnswer } from '../../../shared/types/api-types'
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
    //View Child
    @ViewChild('answerEditor') answerEditor!: ElementRef
    questionId = input<string>('')
    questionQuery = this.backendService.fetchQuestion(this.questionId)
    createAnswer = this.backendService.createAnswer()
    updateAnswer = this.backendService.updateAnswer()
    answerEditorSticky: boolean = false
    authService = inject(AuthService)
    editAnswer: Answer | undefined = undefined

    constructor(private backendService: BackendService) {}

    handleCreateAnswer = (answer: CreateAnswer) => {
        if (this.editAnswer) {
            this.updateAnswer.mutate({
                questionId: this.questionId(),
                answerId: this.editAnswer.id,
                answer: answer,
            })
        } else {
            this.createAnswer.mutate({
                questionId: this.questionId(),
                answer: answer,
            })
        }
    }

    handleEditAnswer = (answer: Answer) => {
        this.editAnswer = answer
        this.answerEditor.nativeElement.scrollIntoView()
    }

    handleCancelAnswer = () => {
        this.editAnswer = undefined
    }

    handleAnswerEditorSticky = (isSticky: boolean) => {
        this.answerEditorSticky = isSticky
    }
}
