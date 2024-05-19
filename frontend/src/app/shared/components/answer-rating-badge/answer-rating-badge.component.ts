import { booleanAttribute, Component, Input } from '@angular/core'
import { provideIcons } from '@ng-icons/core'
import { heroStar } from '@ng-icons/heroicons/outline'
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm'
import { formatNumber, NgClass, NgIf } from '@angular/common'

@Component({
    selector: 'app-answer-rating-badge',
    standalone: true,
    imports: [HlmIconComponent, NgClass, NgIf],
    templateUrl: './answer-rating-badge.component.html',
    styleUrl: './answer-rating-badge.component.css',
    providers: [provideIcons({ heroStar })],
})
export class AnswerRatingBadgeComponent {
    @Input({ required: true }) rating!: number
    @Input({ transform: booleanAttribute }) showBestAnswer: boolean = true
    protected readonly formatNumber = formatNumber
    protected readonly Math = Math

    handleFormatAnswerRating = (rating: number) => {
        if (rating <= 0) return '-'
        return formatNumber(Math.round(rating * 10) / 10, 'en-UK', '1.0-1')
    }
}
