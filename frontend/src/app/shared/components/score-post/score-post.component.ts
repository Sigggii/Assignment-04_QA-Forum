import { Component, EventEmitter, inject, Input, Output } from '@angular/core'
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm'
import { provideIcons } from '@ng-icons/core'
import { lucideArrowBigUp, lucideArrowBigDown } from '@ng-icons/lucide'
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm'
import { NgClass, NgIf } from '@angular/common'
import { Vote } from '../../types/api-types'
import { NavigationService } from '../../../core/services/navigation.service'

// true: upvote, false: upvote, undefined: not voted

type VoteComponent = 'UPVOTE' | 'DOWNVOTE'

@Component({
    selector: 'app-score-post',
    standalone: true,
    imports: [HlmIconComponent, HlmButtonDirective, NgClass, NgIf],
    templateUrl: './score-post.component.html',
    styleUrl: './score-post.component.css',
    providers: [provideIcons({ lucideArrowBigUp, lucideArrowBigDown })],
})
export class ScorePostComponent {
    @Input() score: number = 0
    @Input() upvoted: Vote
    @Input() disabled: boolean = false
    @Output() vote: EventEmitter<Vote> = new EventEmitter<Vote>()

    navigationService = inject(NavigationService)

    handleVote = (component: VoteComponent) => {
        if (this.disabled) {
            this.navigationService.openLogin()
            return
        }

        let scoreChange = 0
        let voteChange: Vote = false
        if (component === 'UPVOTE') {
            scoreChange = this.upvoted
                ? -1
                : this.upvoted === undefined || this.upvoted === null
                  ? +1
                  : +2

            voteChange = this.upvoted ? undefined : true
        } else {
            scoreChange = this.upvoted
                ? -2
                : this.upvoted === undefined || this.upvoted === null
                  ? -1
                  : +1

            voteChange = this.upvoted === false ? undefined : false
        }
        this.score = this.score + scoreChange
        this.upvoted = voteChange
        this.vote.emit(voteChange)
    }
}
