import { Component, Input } from '@angular/core'
import { NgIf } from '@angular/common'

@Component({
    selector: 'app-comments',
    standalone: true,
    imports: [NgIf],
    templateUrl: './comments.component.html',
    styleUrl: './comments.component.css',
})
export class CommentsComponent {
    @Input() comments: string[] = []
}
