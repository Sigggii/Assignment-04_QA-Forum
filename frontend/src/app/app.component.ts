import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm'
import { HlmInputDirective } from '@spartan-ng/ui-input-helm'
import { AppbarComponent } from './core/components/appbar/appbar.component'
import { NgIf } from '@angular/common'
import { SidebarComponent } from './core/components/sidebar/sidebar.component'

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
export class AppComponent {
    isSidebarOpen = false

    toggleSidebar() {
        this.isSidebarOpen = !this.isSidebarOpen
    }

    closeSidebar() {
        this.isSidebarOpen = false
    }
}
