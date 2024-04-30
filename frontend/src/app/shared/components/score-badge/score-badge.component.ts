import { Component, Input } from '@angular/core'
import { provideIcons } from '@ng-icons/core'
import { lucideArrowBigUp, lucideArrowBigDown } from '@ng-icons/lucide'
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm'

@Component({
    selector: 'app-score-badge',
    standalone: true,
    imports: [HlmIconComponent],
    templateUrl: './score-badge.component.html',
    styleUrl: './score-badge.component.css',
    providers: [provideIcons({ lucideArrowBigUp, lucideArrowBigDown })],
})
export class ScoreBadgeComponent {
    @Input({ required: true }) score!: number
}
