import {
    Component,
    EventEmitter,
    forwardRef,
    Input,
    Output,
} from '@angular/core'
import { NgForOf, NgIf } from '@angular/common'
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm'
import {
    ControlValueAccessor,
    FormsModule,
    NG_VALUE_ACCESSOR,
} from '@angular/forms'
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
    providers: [
        provideIcons({ lucideX }),
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => BadgeInputComponent),
            multi: true,
        },
    ],
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
export class BadgeInputComponent implements ControlValueAccessor {
    @Input() label: string = ''

    public value: string[] = []
    internalTags: string[] = []
    editBadge: string = ''

    public onTouched = () => {}
    public onChange = (value: string[]) => {}

    public touched: boolean = false

    writeValue(value: string[]): void {
        this.value = value.filter(val => val.trim() !== '')
    }
    registerOnChange(onChange: any): void {
        this.onChange = onChange
    }
    registerOnTouched(onTouched: any): void {
        this.onTouched = onTouched
    }

    handleNewBadgeInput = (event: Event) => {
        const input = event.target as HTMLInputElement
        //don't allow space if input is empty
        if (input.value.trim() === '') {
            this.internalTags.pop()
            this.internalTags.push('')
            this.writeValue(this.internalTags)
            this.onChange(this.value)
            input.value = ''
            return
        }
        const newBadgeResult = this.parseNewBadges(input)
        //remove newBadges which already exist and empty strings
        const filteredBadges = newBadgeResult.newBadges.filter(
            elem => !this.value.slice(0, -1).includes(elem) && elem !== ''
        )

        this.internalTags = this.internalTags.slice(0, -1)
        this.internalTags.push(...filteredBadges, newBadgeResult.lastValue)
        this.writeValue(this.internalTags)

        input.value = newBadgeResult.lastValue

        this.onChange(this.value)
        this.onTouched()
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
        //if there are new badges, set them at position of editedBadge and set badge to not edited
        if (newBadge.length >= 1) {
            //if last value is not empty, add this to new badges as well (handles copy paste cases)
            if (newBadgesResult.lastValue !== '')
                newBadge.push(newBadgesResult.lastValue)
            const filteredBadges = newBadge.filter(
                elem =>
                    !this.internalTags.includes(elem) || elem === editedBadge
            )
            const indexEditBadge = this.internalTags.indexOf(editedBadge)
            indexEditBadge !== -1 &&
                this.internalTags.splice(indexEditBadge, 1, ...filteredBadges)
            this.writeValue(this.internalTags)
            this.editBadge = ''
        }
        this.onChange(this.value)
        this.onTouched()
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
            if (this.value.length >= 1) {
                this.internalTags.pop()
                input.value = this.value[this.value.length - 1] as string
                event.preventDefault()
            }
        }
    }

    handleDeleteBadge = (badge: string) => {
        this.internalTags = this.internalTags.filter(cat => badge !== cat)
        this.writeValue(this.internalTags)
        this.onChange(this.value)
        this.onTouched()
    }

    handleEditBadge = (badge: string) => {
        this.editBadge = badge
    }
}
