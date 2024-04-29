import { Component, Input } from '@angular/core'
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm'
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm'
import { provideIcons } from '@ng-icons/core'
import { lucideUser } from '@ng-icons/lucide'
import { NgClass } from '@angular/common'

@Component({
    selector: 'app-user-badge',
    standalone: true,
    imports: [HlmBadgeDirective, HlmIconComponent, NgClass],
    templateUrl: './user-badge.component.html',
    styleUrl: './user-badge.component.css',
    providers: [provideIcons({ lucideUser })],
})
export class UserBadgeComponent {
    @Input({ required: true }) user!: { username: string; role: string } //TODO: Add real type
}
