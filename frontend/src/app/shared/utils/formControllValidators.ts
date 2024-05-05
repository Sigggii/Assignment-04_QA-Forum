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
