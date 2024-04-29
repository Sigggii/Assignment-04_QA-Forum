import { Component, Input } from '@angular/core'
import { provideIcons } from '@ng-icons/core'
import { lucideMessageCircleReply } from '@ng-icons/lucide'
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm'
import { NgStyle } from '@angular/common'

@Component({
    selector: 'app-answer-count-badge',
    standalone: true,
    imports: [HlmIconComponent, NgStyle],
    templateUrl: './answer-count-badge.component.html',
    styleUrl: './answer-count-badge.component.css',
    providers: [provideIcons({ lucideMessageCircleReply })],
})
export class AnswerCountBadgeComponent {
    @Input({ required: true }) commentCount!: number
}
