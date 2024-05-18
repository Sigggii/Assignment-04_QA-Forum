import { Component, EventEmitter, Input, Output } from '@angular/core'
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm'
import { provideIcons } from '@ng-icons/core'
import { heroStarSolid } from '@ng-icons/heroicons/solid'
import { heroStar } from '@ng-icons/heroicons/outline'
import { NgClass } from '@angular/common'

/**
 * Returns the rating of a answer (1-5). If undefined is returned, rating was
 * deleted
 */
@Component({
    selector: 'app-rate-answer',
    standalone: true,
    imports: [HlmIconComponent, NgClass],
    templateUrl: './rate-answer.component.html',
    styleUrl: './rate-answer.component.css',
    providers: [provideIcons({ heroStarSolid, heroStar })],
})
export class RateAnswerComponent {
    @Input() currentRating: number | undefined
    @Output() rate: EventEmitter<number> = new EventEmitter<number>()
    starIndexes = [1, 2, 3, 4, 5]
    hoverStar = -1

    handleHoverOver = (startIndex: number) => {
        this.hoverStar = startIndex
    }

    handleHoverLeave = () => {
        this.hoverStar = -1
    }

    handleSetRating = (value: number) => {
        const newRating = value === this.currentRating ? undefined : value
        this.rate.emit(newRating)
    }
    protected readonly heroStarSolid = heroStarSolid
    protected readonly heroStar = heroStar
}
