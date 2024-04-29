import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

export const minLengthArray = (minLength: number): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
        if (control.value && !Array.isArray(control.value)) {
            return null // Not an array, so skip validation
        }
        const value = control.value as any[] // Cast to array type
        return value.length < minLength ? { minLengthArray: true } : null
    }
}

export const maxLengthArray = (maxLength: number): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
        if (control.value && !Array.isArray(control.value)) {
            return null // Not an array, so skip validation
        }
        const value = control.value as any[] // Cast to array type
        return value.length > maxLength ? { maxLengthArray: true } : null
    }
}

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
