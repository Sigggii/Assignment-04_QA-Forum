import { Component, EventEmitter, inject, Output } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'
import {
    lucideMessageCircleQuestion,
    lucideHome,
    lucideMessageCircleMore,
} from '@ng-icons/lucide'
import { provideIcons } from '@ng-icons/core'
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm'
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service'
import { NgIf } from '@angular/common'

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [RouterLink, RouterLinkActive, HlmIconComponent, NgIf],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css',
    providers: [
        provideIcons({
            lucideMessageCircleQuestion,
            lucideHome,
            lucideMessageCircleMore,
        }),
    ],
})
export class SidebarComponent {
    @Output() closeSidebar = new EventEmitter<void>()
    authService = inject(AuthService)

    router = inject(Router)

    handleClick(path: string) {
        this.router.navigate([path])
        this.closeSidebar.emit()
    }
}
