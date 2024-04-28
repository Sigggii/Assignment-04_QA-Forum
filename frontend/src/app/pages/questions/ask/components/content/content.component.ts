import { Component } from '@angular/core'
import { QuillEditorComponent } from 'ngx-quill'

@Component({
    selector: 'app-content',
    standalone: true,
    imports: [QuillEditorComponent],
    templateUrl: './content.component.html',
    styleUrl: './content.component.css',
})
export class ContentComponent {
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
