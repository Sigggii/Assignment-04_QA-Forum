import { Component, EventEmitter, inject, Output } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { lucideMessageCircleQuestion, lucideHome } from '@ng-icons/lucide'
import { provideIcons } from '@ng-icons/core'
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm'
import { Router } from '@angular/router'
import { BrnSeparatorComponent } from '@spartan-ng/ui-separator-brain'

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [
        RouterLink,
        RouterLinkActive,
        HlmIconComponent,
        BrnSeparatorComponent,
    ],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css',
    providers: [provideIcons({ lucideMessageCircleQuestion, lucideHome })],
})
export class SidebarComponent {
    @Output() closeSidebar = new EventEmitter<void>()

    router = inject(Router)

    handleClick(path: string) {
        this.router.navigate([path])
        this.closeSidebar.emit()
    }
}
