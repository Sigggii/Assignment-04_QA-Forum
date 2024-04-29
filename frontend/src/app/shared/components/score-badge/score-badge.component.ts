import { Component, Input } from '@angular/core'
import { provideIcons } from '@ng-icons/core'
import { lucideArrowBigUp } from '@ng-icons/lucide'
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm'
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm'

@Component({
    selector: 'app-score-badge',
    standalone: true,
    imports: [HlmBadgeDirective, HlmIconComponent],
    templateUrl: './score-badge.component.html',
    styleUrl: './score-badge.component.css',
    providers: [provideIcons({ lucideArrowBigUp })],
})
export class ScoreBadgeComponent {
    @Input({ required: true }) score!: number
}
