import { Component, inject } from '@angular/core'
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm'
import { NavigationService } from '../../core/services/navigation.service'
import { RouterLink } from '@angular/router'
import { NgIf } from '@angular/common'
import { AuthService } from '../../core/services/auth.service'

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [HlmButtonDirective, RouterLink, NgIf],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent {
    navigationService = inject(NavigationService)
    authService = inject(AuthService)
}
