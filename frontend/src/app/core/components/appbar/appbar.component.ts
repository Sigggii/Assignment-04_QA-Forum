import { Component, EventEmitter, inject, Output } from '@angular/core'
import { provideIcons } from '@ng-icons/core'
import {
    lucideMenu,
    lucideBell,
    lucideLogOut,
    lucideSun,
    lucideMoon,
    lucideSearch,
} from '@ng-icons/lucide'
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm'
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm'
import {
    HlmAvatarComponent,
    HlmAvatarFallbackDirective,
} from '@spartan-ng/ui-avatar-helm'
import { HlmInputDirective } from '@spartan-ng/ui-input-helm'
import { NgClass, NgIf, NgOptimizedImage } from '@angular/common'
import { RouterLink } from '@angular/router'
import { AuthService } from '../../services/auth.service'
import { NavigationService } from '../../services/navigation.service'
import { BackendService } from '../../services/backend.service'
import {
    HlmMenuComponent,
    HlmMenuGroupComponent,
    HlmMenuItemDirective,
    HlmMenuItemIconDirective,
    HlmMenuLabelComponent,
    HlmMenuSeparatorComponent,
} from '@spartan-ng/ui-menu-helm'
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain'
import { ThemeService } from '../../services/theme.service'
import { SearchComponent } from '../../../shared/components/search/search.component'

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
        NgIf,
        NgClass,
        HlmMenuComponent,
        HlmMenuLabelComponent,
        HlmMenuSeparatorComponent,
        HlmMenuGroupComponent,
        HlmMenuItemDirective,
        HlmMenuItemIconDirective,
        BrnMenuTriggerDirective,
        SearchComponent,
    ],
    templateUrl: './appbar.component.html',
    styleUrl: './appbar.component.css',
    providers: [
        provideIcons({
            lucideMenu,
            lucideBell,
            lucideLogOut,
            lucideSun,
            lucideMoon,
            lucideSearch,
        }),
    ],
})
export class AppbarComponent {
    @Output() toggleSidebar = new EventEmitter<void>()

    themeService = inject(ThemeService)
    authService = inject(AuthService)
    navService = inject(NavigationService)
    backendService = inject(BackendService)

    logoutUser = this.backendService.logoutUser()

    handleToggleSidebar() {
        this.toggleSidebar.emit()
    }

    async handleLogoutUser() {
        this.logoutUser.mutate()
        await this.navService.openLogin()
    }
}
