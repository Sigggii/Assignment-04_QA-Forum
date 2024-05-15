import { Component } from '@angular/core'
import { HlmInputDirective } from '@spartan-ng/ui-input-helm'
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm'
import { ContentComponent } from './components/content/content.component'
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm'
import {
    FormsModule,
    FormGroup,
    ReactiveFormsModule,
    Validators,
    FormControl,
} from '@angular/forms'
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common'
import { BackendService } from '../../../core/services/backend.service'

import {
    maxLengthArray,
    minLengthArray,
} from '../../../shared/utils/formControllValidators'
import { BadgeInputComponent } from '../../../shared/components/badge-input/badge-input.component'
import { CreateQuestionRequest } from '../../../shared/types/api-types'
import { QuillEditorValue } from '../../../shared/components/quill-js/quill-js.component'
import { maxLengthTag } from '../../../shared/components/badge-input/badgeInputValidators'
import { quillJsTextRequired } from '../../../shared/components/quill-js/quillJsValidators'
import { NavigationService } from '../../../core/services/navigation.service'

@Component({
    selector: 'app-ask',
    standalone: true,
    imports: [
        HlmInputDirective,
        HlmLabelDirective,
        ContentComponent,
        HlmButtonDirective,
        FormsModule,
        AsyncPipe,
        ReactiveFormsModule,
        JsonPipe,
        BadgeInputComponent,
        NgIf,
    ],
    templateUrl: './ask.component.html',
    styleUrl: './ask.component.css',
})
export class AskComponent {
    minTags = 1
    maxTags = 5
    maxTagLength = 20
    createQuestion = this.backendService.createQuestion(
        this.navService.openQuestion
    )

    questionForm = new FormGroup({
        title: new FormControl<string>('', {
            validators: [Validators.required, Validators.minLength(1)],
            nonNullable: true,
        }),
        content: new FormControl<QuillEditorValue>(
            { html: '', text: '' },
            {
                validators: [quillJsTextRequired()],
                nonNullable: true,
            }
        ),
        tags: new FormControl<string[]>([], {
            validators: [
                minLengthArray(this.minTags),
                maxLengthArray(this.maxTags),
                maxLengthTag(this.maxTagLength),
            ],
            nonNullable: true,
        }),
    })

    constructor(
        private backendService: BackendService,
        private navService: NavigationService
    ) {}

    handleSubmitQuestion = () => {
        if (this.questionForm.valid) {
            const question: CreateQuestionRequest = {
                question: {
                    title: this.questionForm.value.title as string,
                    content: this.questionForm.value.content?.html as string,
                },
                tags: (this.questionForm.value.tags as string[]).map(
                    (tag: string) => {
                        return { name: tag }
                    }
                ),
            }
            this.createQuestion.mutate(question)
        }
    }
}
