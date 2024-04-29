import { Component, Input } from '@angular/core'
import { provideIcons } from '@ng-icons/core'
import { lucideMessageCircleReply } from '@ng-icons/lucide'
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm'
import { NgStyle } from '@angular/common'

@Component({
    selector: 'app-comment-count-badge',
    standalone: true,
    imports: [HlmIconComponent, NgStyle],
    templateUrl: './comment-count-badge.component.html',
    styleUrl: './comment-count-badge.component.css',
    providers: [provideIcons({ lucideMessageCircleReply })],
})
export class CommentCountBadgeComponent {
    @Input({ required: true }) commentCount!: number
}
