import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core'
import { BadgeInputComponent } from '../../../shared/components/badge-input/badge-input.component'

import { HlmButtonDirective } from '@spartan-ng/ui-button-helm'
import { HlmInputDirective } from '@spartan-ng/ui-input-helm'
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm'
import { NgIf } from '@angular/common'
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms'
import {
    QuillEditorValue,
    QuillJsComponent,
} from '../../../shared/components/quill-js/quill-js.component'
import { quillJsTextRequired } from '../../../shared/components/quill-js/quillJsValidators'
import {
    maxLengthArray,
    minLengthArray,
} from '../../../shared/utils/formControllValidators'
import { maxLengthTag } from '../../../shared/components/badge-input/badgeInputValidators'
import { BackendService } from '../../../core/services/backend.service'
import { NavigationService } from '../../../core/services/navigation.service'
import {
    CreateQuestionRequest,
    QuestionWithTags,
} from '../../../shared/types/api-types'

@Component({
    selector: 'app-question-editor',
    standalone: true,
    imports: [
        BadgeInputComponent,
        HlmButtonDirective,
        HlmInputDirective,
        HlmLabelDirective,
        NgIf,
        ReactiveFormsModule,
        QuillJsComponent,
    ],
    templateUrl: './question-editor.component.html',
    styleUrl: './question-editor.component.css',
})
export class QuestionEditorComponent implements OnChanges {
    modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
            ['blockquote', 'code-block', 'link', 'image'], // link and image, video
        ],
    }
    minTags = 1
    maxTags = 5
    maxTagLength = 20
    @Input() editQuestion: QuestionWithTags | undefined
    @Input() cancelHandler: (() => Promise<void>) | undefined
    @Output() submitQuestion: EventEmitter<CreateQuestionRequest> =
        new EventEmitter()

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

    ngOnChanges(changes: SimpleChanges) {
        if (changes['editQuestion'] && this.editQuestion) {
            this.questionForm.setValue({
                title: this.editQuestion.title,
                //ToDo checken ob das probleme macht, dass der Text leer ist
                content: {
                    html: this.editQuestion.content,
                    text: this.editQuestion.content,
                },
                tags: this.editQuestion.tags.map(tag => tag.name),
            })
        }
    }

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
            this.submitQuestion.emit(question)
        }
    }
}
