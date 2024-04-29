import { Component } from '@angular/core'
import { HlmInputDirective } from '@spartan-ng/ui-input-helm'
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm'
import { ContentComponent } from './components/content/content.component'
import { TagInputComponent } from '../../../shared/components/tag-input/tag-input.component'
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm'
import {
    FormsModule,
    FormGroup,
    ReactiveFormsModule,
    Validators,
    FormControl,
} from '@angular/forms'
import { AsyncPipe, JsonPipe } from '@angular/common'
import { BackendService } from '../../../core/services/backend.service'
import { CreateQuestionRequest } from '@/shared/types'

@Component({
    selector: 'app-ask',
    standalone: true,
    imports: [
        HlmInputDirective,
        HlmLabelDirective,
        ContentComponent,
        TagInputComponent,
        HlmButtonDirective,
        FormsModule,
        AsyncPipe,
        ReactiveFormsModule,
        JsonPipe,
    ],
    templateUrl: './ask.component.html',
    styleUrl: './ask.component.css',
})
export class AskComponent {
    questionForm = new FormGroup({
        title: new FormControl<string>('', {
            validators: [Validators.required, Validators.min(1)],
            nonNullable: true,
        }),
        content: new FormControl<string>('', { nonNullable: true }),
        tags: new FormControl<string[]>([], { nonNullable: true }),
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
                tags: (this.questionForm.value.tags as string[]).map((tag: string) => {
                    return { name: tag }
                }),
            }
            this.backendService.createQuestions(question)
        }
    }
}