import { Component, EventEmitter, Output } from '@angular/core'
import { provideIcons } from '@ng-icons/core'
import { lucideMenu, lucideBell, lucideSearch } from '@ng-icons/lucide'
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm'
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm'
import {
    HlmAvatarComponent,
    HlmAvatarFallbackDirective,
} from '@spartan-ng/ui-avatar-helm'
import { HlmInputDirective } from '@spartan-ng/ui-input-helm'
import { NgOptimizedImage } from '@angular/common'
import { RouterLink } from '@angular/router'

@Component({
    selector: 'app-appbar',
    standalone: true,
    imports: [
        HlmIconComponent,
        HlmButtonDirective,
        HlmAvatarComponent,
        HlmAvatarFallbackDirective,
        HlmInputDirective,
        NgOptimizedImage,
        RouterLink,
    ],
    templateUrl: './appbar.component.html',
    styleUrl: './appbar.component.css',
    providers: [provideIcons({ lucideMenu, lucideBell, lucideSearch })],
})
export class AppbarComponent {
    @Output() toggleSidebar = new EventEmitter<void>()

    handleToggleSidebar() {
        this.toggleSidebar.emit()
    }
}
