import { Component, Input } from '@angular/core'
import { provideIcons } from '@ng-icons/core'
import { heroStar } from '@ng-icons/heroicons/outline'
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm'
import { formatNumber, NgClass } from '@angular/common'

@Component({
    selector: 'app-answer-rating-badge',
    standalone: true,
    imports: [HlmIconComponent, NgClass],
    templateUrl: './answer-rating-badge.component.html',
    styleUrl: './answer-rating-badge.component.css',
    providers: [provideIcons({ heroStar })],
})
export class AnswerRatingBadgeComponent {
    @Input({ required: true }) rating!: number
    protected readonly formatNumber = formatNumber
    protected readonly Math = Math
}
