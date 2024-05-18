import { Component, forwardRef, Input } from '@angular/core'
import { ContentChange, QuillEditorComponent } from 'ngx-quill'
import {
    ControlValueAccessor,
    FormsModule,
    NG_VALUE_ACCESSOR,
} from '@angular/forms'
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm'

const initialModules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
        ['blockquote', 'code-block', 'link', 'image'], // link and image, video
    ],
}

export type QuillEditorValue = { html: string; text: string }

@Component({
    selector: 'app-quill-js',
    standalone: true,
    imports: [QuillEditorComponent, HlmLabelDirective, FormsModule],
    templateUrl: './quill-js.component.html',
    styleUrl: './quill-js.component.css',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => QuillJsComponent),
            multi: true,
        },
    ],
})
export class QuillJsComponent implements ControlValueAccessor {
    @Input() modules = initialModules
    @Input() theme: string = 'snow'
    @Input() classes: string = ''
    @Input() placeholder: string = ''
    @Input() label: string = ''
    isProgrammaticInput: boolean = false

    public onTouched = () => {}
    public onChange = (value: QuillEditorValue) => {}

    public touched: boolean = false

    public value: QuillEditorValue = { html: '', text: '' }

    writeValue(value: QuillEditorValue): void {
        this.value = value
        this.isProgrammaticInput = true
    }
    registerOnChange(onChange: any): void {
        this.onChange = onChange
    }
    registerOnTouched(onTouched: any): void {
        this.onTouched = onTouched
    }
    handleContentChanged = (event: ContentChange) => {
        if (this.isProgrammaticInput) {
            this.isProgrammaticInput = false
            return
        }
        this.value = { html: event.html || '', text: event.text || '' }
        this.onChange(this.value)
        this.onTouched()
    }
    protected readonly initialModules = initialModules
}
