import { Component, Input } from '@angular/core'
import { BadgeInputComponent } from '../badge-input/badge-input.component'

@Component({
    selector: 'app-category-input',
    standalone: true,
    imports: [BadgeInputComponent],
    templateUrl: './category-input.component.html',
    styleUrl: './category-input.component.css',
})
export class CategoryInputComponent {
    @Input() maxCategories = 5
    categoryMaxLength = 20
    categories: string[] = []
    errorMessages: string[] = []

    handleCategoryChange = (categories: string[]) => {
        this.categories = categories
        this.errorMessages = this.createErrorMessage()
    }

    createErrorMessage = (): string[] => {
        const errorMessages: string[] = []
        if (this.maxCategories && this.categories.length > this.maxCategories) {
            errorMessages.push(
                `Maximum ${this.maxCategories} categories: Currently there are ${this.categories.length} categories`
            )
        }

        if (this.categoryMaxLength) {
            const lenthErrorMessages: string[] = this.categories
                .map((category) => {
                    return category.length > this.categoryMaxLength!
                        ? `Category ${category} is ${category.length - this.categoryMaxLength!} chars too long`
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
