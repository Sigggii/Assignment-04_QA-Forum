import { Component, EventEmitter, Input, Output } from '@angular/core'
import { NgForOf, NgIf } from '@angular/common'
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm'
import { FormsModule } from '@angular/forms'
import { provideIcons } from '@ng-icons/core'
import { lucideX } from '@ng-icons/lucide'
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm'
import { DynamicSizeDirective } from '../../directives/DynamicSizeDirective'
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm'

@Component({
    selector: 'app-badge-input',
    standalone: true,
    imports: [
        NgForOf,
        HlmBadgeDirective,
        FormsModule,
        HlmIconComponent,
        NgIf,
        DynamicSizeDirective,
        HlmLabelDirective,
    ],
    templateUrl: './badge-input.component.html',
    providers: [provideIcons({ lucideX })],
    styleUrl: './badge-input.component.css',
})

/*
TODO: Not finished yet:
    - has problems with line breaks copy-pasted
    - maybe use directives for control of inputs
    - currently I use span for badges (eslint is whining about it)
    - eslint mag kein autofocus attribut (ignoren oder anders handlen?)
    - unordered list listen elemente funktionieren nicht
 */
export class BadgeInputComponent {
    @Input() errorMessages: string[] = []
    @Output() badgeChange = new EventEmitter<string[]>()

    badges: string[] = []
    editBadge: string = ''

    handleNewBadgeInput = (event: Event) => {
        const input = event.target as HTMLInputElement
        //don't allow space if input is empty
        if (input.value.trim() === '') {
            input.value = ''
            return
        }
        const newBadgeResult = this.parseNewBadges(input)
        //remove newBadges which already exist and empty strings
        const filteredBadges = newBadgeResult.newBadges.filter(
            elem => !this.badges.includes(elem) && elem !== ''
        )
        this.badges.push(...filteredBadges)
        input.value = newBadgeResult.lastValue
        this.badgeChange.emit(this.badges)
    }

    handleEditBadgeInput = (event: Event, editedBadge: string) => {
        const input = event.target as HTMLInputElement
        //if input empty remove and also remove badge
        if (input.value.trim() === '') {
            this.handleDeleteBadge(editedBadge)
            this.editBadge = ''
            return
        }
        const newBadgesResult = this.parseNewBadges(input)
        const newBadge = newBadgesResult.newBadges
        console.log(newBadge)
        //if there are new badges, set them at position of editedBadge and set badge to not edited
        if (newBadge.length >= 1) {
            //if last value is not empty, add this to new badges as well (handles copy paste cases)
            if (newBadgesResult.lastValue !== '')
                newBadge.push(newBadgesResult.lastValue)
            const filteredBadges = newBadge.filter(
                elem => !this.badges.includes(elem) || elem === editedBadge
            )
            const indexEditBadge = this.badges.indexOf(editedBadge)
            indexEditBadge !== -1 &&
                this.badges.splice(indexEditBadge, 1, ...filteredBadges)
            this.editBadge = ''
        }
        this.badgeChange.emit(this.badges)
    }

    parseNewBadges(input: HTMLInputElement) {
        const splitInput = input.value.split(' ')
        const newBadges = splitInput.slice(0, -1)
        //only allow badges, which are not already set
        return {
            newBadges: newBadges,
            lastValue: splitInput[splitInput.length - 1],
        }
    }

    /**
     * Edit last badge chip on backspace and empty input
     */
    handleKeyDown = (event: KeyboardEvent) => {
        const input = event.target as HTMLInputElement
        if (event.key === 'Backspace' && input.value === '') {
            if (this.badges.length >= 1) {
                input.value = this.badges.pop() as string
            }
        }
    }

    handleDeleteBadge = (badge: string) => {
        this.badges = this.badges.filter(cat => badge !== cat)
        this.badgeChange.emit(this.badges)
    }

    handleEditBadge = (badge: string) => {
        this.editBadge = badge
    }
}
