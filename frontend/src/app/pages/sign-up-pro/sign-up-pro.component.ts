import { Component } from '@angular/core'
import { SignUpComponent } from '../../shared/components/sign-up/sign-up.component'

@Component({
    selector: 'app-sign-up-pro',
    standalone: true,
    imports: [SignUpComponent],
    templateUrl: './sign-up-pro.component.html',
    styleUrl: './sign-up-pro.component.css',
})
export class SignUpProComponent {}
