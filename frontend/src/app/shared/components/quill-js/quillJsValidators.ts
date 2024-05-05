import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'
import { QuillEditorValue } from './quill-js.component'

/**
 * Checks if text of quillJsEditor is not empty (don't count line breaks)
 */
export const quillJsTextRequired = (): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
        if (
            control.value &&
            (control.value as QuillEditorValue).text.replaceAll('\n', '')
                .length !== 0
        ) {
            return null
        }

        return { quillJsRequired: true }
    }
}
