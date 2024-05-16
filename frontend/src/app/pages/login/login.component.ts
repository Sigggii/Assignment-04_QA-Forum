import { Component, inject } from '@angular/core'
import { NgOptimizedImage } from '@angular/common'
import { HlmInputDirective } from '@spartan-ng/ui-input-helm'
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm'
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm'
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms'
import { BackendService } from '../../core/services/backend.service'
import { NavigationService } from '../../core/services/navigation.service'
import { AuthService } from '../../core/services/auth.service'

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        NgOptimizedImage,
        HlmInputDirective,
        HlmLabelDirective,
        HlmButtonDirective,
        ReactiveFormsModule,
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent {
    loginForm = new FormGroup({
        username: new FormControl<string>('', {
            validators: [Validators.required, Validators.minLength(1)],
            nonNullable: true,
        }),
        password: new FormControl<string>('', {
            validators: [Validators.required, Validators.minLength(1)],
            nonNullable: true,
        }),
    })

    backendService = inject(BackendService)
    navService = inject(NavigationService)
    authService = inject(AuthService)
    loginUser = this.backendService.loginUser()

    handleLoginUser = async () => {
        const username = this.loginForm.controls.username.value
        const password = this.loginForm.controls.password.value

        this.loginUser.mutate({ username: username, password: password })
        await this.navService.openHome()
    }
}
