import { Component, EventEmitter, Input, Output } from '@angular/core'
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm'
import { provideIcons } from '@ng-icons/core'
import { lucideArrowBigUp, lucideArrowBigDown } from '@ng-icons/lucide'
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm'
import { NgClass } from '@angular/common'

// true: upvote, false: upvote, undefined: not voted
export type Vote = boolean | undefined
type VoteComponent = 'UPVOTE' | 'DOWNVOTE'

@Component({
    selector: 'app-score-post',
    standalone: true,
    imports: [HlmIconComponent, HlmButtonDirective, NgClass],
    templateUrl: './score-post.component.html',
    styleUrl: './score-post.component.css',
    providers: [provideIcons({ lucideArrowBigUp, lucideArrowBigDown })],
})
export class ScorePostComponent {
    @Input() score: number = 0
    @Input() upvoted: Vote
    @Output() vote: EventEmitter<Vote> = new EventEmitter<Vote>()

    handleVote = (component: VoteComponent) => {
        let scoreChange = 0
        let voteChange: Vote = false
        if (component === 'UPVOTE') {
            scoreChange = this.upvoted
                ? -1
                : this.upvoted === undefined
                  ? +1
                  : +2

            voteChange = this.upvoted ? undefined : true
        } else {
            scoreChange = this.upvoted
                ? -2
                : this.upvoted === undefined
                  ? -1
                  : +1

            voteChange = this.upvoted === false ? undefined : false
        }
        this.score = this.score + scoreChange
        this.upvoted = voteChange
        this.vote.emit(voteChange)
    }
}
