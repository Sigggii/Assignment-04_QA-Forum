import { Component, inject, Input } from '@angular/core'
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm'
import { HlmInputDirective } from '@spartan-ng/ui-input-helm'
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm'
import { NgClass, NgIf, NgOptimizedImage } from '@angular/common'
import { BackendService } from '../../../core/services/backend.service'
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms'
import { passwordMatchValidator } from '../../utils/formControllValidators'
import { NavigationService } from '../../../core/services/navigation.service'

@Component({
    selector: 'app-sign-up',
    standalone: true,
    imports: [
        HlmButtonDirective,
        HlmInputDirective,
        HlmLabelDirective,
        NgOptimizedImage,
        NgIf,
        NgClass,
        ReactiveFormsModule,
    ],
    templateUrl: './sign-up.component.html',
    styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
    navigationService = inject(NavigationService)

    registerForm = new FormGroup(
        {
            username: new FormControl<string>('', {
                validators: [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(30),
                ],
                nonNullable: true,
            }),
            password: new FormControl<string>('', {
                validators: [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(256),
                ],
                nonNullable: true,
            }),
            passwordConfirm: new FormControl<string>('', {
                validators: [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(256),
                ],
                nonNullable: true,
            }),
        },
        { validators: [passwordMatchValidator('password', 'passwordConfirm')] }
    )

    @Input({ required: true }) type: 'noob' | 'pro' = 'noob'
    backendService = inject(BackendService)
    registerUser = this.backendService.registerUser()

    handleRegisterUser = () => {
        const username = this.registerForm.controls.username.value
        const password = this.registerForm.controls.password.value
        this.registerUser.mutate({
            user: { username: username, password: password },
            type: this.type,
        })
    }
}
