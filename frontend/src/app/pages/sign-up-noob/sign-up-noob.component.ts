import { Component } from '@angular/core'
import { SignUpComponent } from '../../shared/components/sign-up/sign-up.component'

@Component({
    selector: 'app-sign-up-noob',
    standalone: true,
    imports: [SignUpComponent],
    templateUrl: './sign-up-noob.component.html',
    styleUrl: './sign-up-noob.component.css',
})
export class SignUpNoobComponent {}
