import { Component, inject, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm'
import { HlmInputDirective } from '@spartan-ng/ui-input-helm'
import { AppbarComponent } from './core/components/appbar/appbar.component'
import { NgIf } from '@angular/common'
import { SidebarComponent } from './core/components/sidebar/sidebar.component'
import { AuthService } from './core/services/auth.service'
import { ThemeService } from './core/services/theme.service'

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        HlmButtonDirective,
        HlmInputDirective,
        AppbarComponent,
        AppbarComponent,
        NgIf,
        SidebarComponent,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
    authService = inject(AuthService)
    themeService = inject(ThemeService)

    isSidebarOpen = false

    toggleSidebar() {
        this.isSidebarOpen = !this.isSidebarOpen
    }

    closeSidebar() {
        this.isSidebarOpen = false
    }

    ngOnInit(): void {
        // set theme on load
        this.themeService.setInitialTheme()

        // observe login status and refresh theme
        this.authService.userObservable.subscribe(() => {
            this.themeService.setInitialTheme()
        })
    }
}
