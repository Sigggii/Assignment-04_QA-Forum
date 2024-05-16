import { Component } from '@angular/core'
import { HlmInputDirective } from '@spartan-ng/ui-input-helm'
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm'
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common'
import { BackendService } from '../../../core/services/backend.service'
import { BadgeInputComponent } from '../../../shared/components/badge-input/badge-input.component'
import { CreateQuestionRequest } from '../../../shared/types/api-types'
import { NavigationService } from '../../../core/services/navigation.service'
import { QuestionEditorComponent } from '../question-editor/question-editor.component'

@Component({
    selector: 'app-ask',
    standalone: true,
    imports: [
        HlmInputDirective,
        HlmLabelDirective,
        HlmButtonDirective,
        FormsModule,
        AsyncPipe,
        ReactiveFormsModule,
        JsonPipe,
        BadgeInputComponent,
        NgIf,
        QuestionEditorComponent,
    ],
    templateUrl: './ask.component.html',
    styleUrl: './ask.component.css',
})
export class AskComponent {
    createQuestion = this.backendService.createQuestion(
        this.navService.openQuestion
    )

    constructor(
        private backendService: BackendService,
        private navService: NavigationService
    ) {}

    handleSubmitQuestion = (question: CreateQuestionRequest) => {
        this.createQuestion.mutate(question)
    }
}
