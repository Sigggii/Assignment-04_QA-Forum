import { Component, forwardRef, Input } from '@angular/core'
import { ContentChange, QuillEditorComponent } from 'ngx-quill'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

const initialModules = {
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

@Component({
    selector: 'app-quill-js',
    standalone: true,
    imports: [QuillEditorComponent],
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

    public onTouched = () => {}
    public onChange = (value: string) => {}

    public touched: boolean = false

    public value: string = ''

    writeValue(value: string): void {
        this.value = value
    }
    registerOnChange(onChange: any): void {
        this.onChange = onChange
    }
    registerOnTouched(onTouched: any): void {
        this.onTouched = onTouched
    }
    handleContentChanged = (event: ContentChange) => {
        console.log(event)
        if (event.html) {
            this.value = event.html
            this.onChange(this.value)
            this.onTouched()
        }
    }
}
