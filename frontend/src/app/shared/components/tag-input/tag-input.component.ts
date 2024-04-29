import { Component, EventEmitter, forwardRef, Input, numberAttribute, Output } from '@angular/core'
import { BadgeInputComponent } from '../badge-input/badge-input.component'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

@Component({
    selector: 'app-tag-input',
    standalone: true,
    imports: [BadgeInputComponent],
    templateUrl: './tag-input.component.html',
    styleUrl: './tag-input.component.css',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TagInputComponent),
            multi: true,
        },
    ],
})
export class TagInputComponent implements ControlValueAccessor {
    @Input({ transform: numberAttribute }) maxTags = 5
    tagMaxLength = 20
    errorMessages: string[] = []

    public onTouched = () => {}
    public onChange = (value: string[]) => {}

    public touched: boolean = false

    //ToDo insert value into badgeinput
    public value: string[] = []

    writeValue(value: string[]) {
        this.value = value
    }

    registerOnChange(onChanged: any) {
        this.onChange = onChanged
    }

    registerOnTouched(onTouched: any) {
        this.onTouched = onTouched
    }

    handleTagChange = (tags: string[]) => {
        this.value = tags
        this.onChange(this.value)
        this.onTouched()
        this.errorMessages = this.createErrorMessage()
    }

    createErrorMessage = (): string[] => {
        const errorMessages: string[] = []
        if (this.maxTags && this.value.length > this.maxTags) {
            errorMessages.push(
                `Maximum ${this.maxTags} tags: Currently there are ${this.value.length} tags`
            )
        }

        if (this.tagMaxLength) {
            const lenthErrorMessages: string[] = this.value
                .map((tag) => {
                    return tag.length > this.tagMaxLength!
                        ? `Tag ${tag} is ${tag.length - this.tagMaxLength!} chars too long`
                        : null
                })
                .filter((message) => {
                    return message !== null
                }) as string[]

            errorMessages.push(...lenthErrorMessages)
        }
        return errorMessages
    }
}
