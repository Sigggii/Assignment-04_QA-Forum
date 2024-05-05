import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

/**
 * Checks if all tags are below or maxLength
 * @param maxLength
 */
export const maxLengthTag = (maxLength: number): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
        if (control.value && !Array.isArray(control.value)) {
            return null // Not an array, so skip validation
        }
        const value = control.value as string[] // Cast to string array type
        return value.every(tag => tag.length <= maxLength)
            ? null
            : { maxTagLength: true }
    }
}
