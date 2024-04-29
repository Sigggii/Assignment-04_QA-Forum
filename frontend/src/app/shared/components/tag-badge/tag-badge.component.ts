import { Component, Input } from '@angular/core'
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm'
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm'
import { provideIcons } from '@ng-icons/core'
import { lucideHash } from '@ng-icons/lucide'

@Component({
    selector: 'app-tag-badge',
    standalone: true,
    imports: [HlmBadgeDirective, HlmIconComponent],
    templateUrl: './tag-badge.component.html',
    styleUrl: './tag-badge.component.css',
    providers: [provideIcons({ lucideHash })],
})
export class TagBadgeComponent {
    @Input({ required: true }) tag!: string
}
