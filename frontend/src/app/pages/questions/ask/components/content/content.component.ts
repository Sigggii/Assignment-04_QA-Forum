import { Component, ElementRef, Input, Output, ViewChild } from '@angular/core'
import { QuillEditorComponent } from 'ngx-quill'
import { QuillJsComponent } from '../../../../../shared/components/quill-js/quill-js.component'
import { ControlContainer, FormGroupDirective, ReactiveFormsModule } from '@angular/forms'

@Component({
    selector: 'app-content',
    standalone: true,
    imports: [QuillEditorComponent, QuillJsComponent, ReactiveFormsModule],
    templateUrl: './content.component.html',
    styleUrl: './content.component.css',
    viewProviders: [
        {
            provide: ControlContainer,
            useExisting: FormGroupDirective,
        },
    ],
})
export class ContentComponent {
    @Input() formControlName: string = ''
    @ViewChild(QuillJsComponent) input!: QuillJsComponent
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
}
