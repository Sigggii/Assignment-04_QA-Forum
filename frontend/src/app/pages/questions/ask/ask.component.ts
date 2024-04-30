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
import { CreateQuestionRequest } from '@/shared/types'
import {
    maxLengthArray,
    maxLengthTag,
    minLengthArray,
} from '../../../shared/utils/formControllValidators'
import { BadgeInputComponent } from '../../../shared/components/badge-input/badge-input.component'

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

    questionForm = new FormGroup({
        title: new FormControl<string>('', {
            validators: [Validators.required, Validators.min(1)],
            nonNullable: true,
        }),
        content: new FormControl<string>('', { nonNullable: true }),
        tags: new FormControl<string[]>([], {
            validators: [
                minLengthArray(this.minTags),
                maxLengthArray(this.maxTags),
                maxLengthTag(this.maxTagLength),
            ],
            nonNullable: true,
        }),
    })
    constructor(private backendService: BackendService) {
        //askStateService.getAskState().subscribe((state) => (this.askState = state))
    }

    handleSubmitQuestion = () => {
        if (this.questionForm.valid) {
            const question: CreateQuestionRequest = {
                question: {
                    title: this.questionForm.value.title as string,
                    content: this.questionForm.value.content as string,
                },
                tags: (this.questionForm.value.tags as string[]).map(
                    (tag: string) => {
                        return { name: tag }
                    }
                ),
            }
            this.backendService.createQuestions(question)
        }
    }
}
