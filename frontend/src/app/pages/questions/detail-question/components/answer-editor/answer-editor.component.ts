import {
    Component,
    EventEmitter,
    input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core'
import {
    QuillEditorValue,
    QuillJsComponent,
} from '../../../../../shared/components/quill-js/quill-js.component'
import { HlmInputDirective } from '@spartan-ng/ui-input-helm'
import { HlmCheckboxComponent } from '@spartan-ng/ui-checkbox-helm'
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { quillJsTextRequired } from '../../../../../shared/components/quill-js/quillJsValidators'
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm'
import { NgIf } from '@angular/common'
import { CreateAnswer } from '../../../../../shared/types/api-types'

@Component({
    selector: 'app-answer-editor',
    standalone: true,
    imports: [
        QuillJsComponent,
        HlmInputDirective,
        HlmCheckboxComponent,
        HlmLabelDirective,
        ReactiveFormsModule,
        HlmButtonDirective,
        NgIf,
    ],
    templateUrl: './answer-editor.component.html',
    styleUrl: './answer-editor.component.css',
})
export class AnswerEditorComponent implements OnChanges {
    editAnswer = input<CreateAnswer | undefined>()
    @Output() create: EventEmitter<CreateAnswer> =
        new EventEmitter<CreateAnswer>()
    @Output() cancel: EventEmitter<void> = new EventEmitter()
    @Output() sticky: EventEmitter<boolean> = new EventEmitter<boolean>()

    createAnswerForm = new FormGroup({
        content: new FormControl<QuillEditorValue>(
            { html: '', text: '' },
            {
                validators: [quillJsTextRequired()],
                nonNullable: true,
            }
        ),
    })

    modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
            [{ align: [] }],
            [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
            ['blockquote', 'code-block', 'link', 'image'], // link and image, video
        ],
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['editAnswer']) {
            const editAnswer = this.editAnswer()
            this.createAnswerForm.markAsUntouched()
            this.createAnswerForm.setValue({
                content: {
                    html: editAnswer?.content || '',
                    text: editAnswer?.content || '',
                },
            })
        }
    }

    handleSubmitForm = () => {
        if (this.createAnswerForm.valid) {
            const content = this.createAnswerForm.value.content?.html as string
            this.create.emit({ content: content })
            this.createAnswerForm.reset()
        }
    }

    handleIsSticky = (e: Event) => {
        const cb = e.target as HTMLInputElement
        this.sticky.emit(cb.checked)
    }
}
