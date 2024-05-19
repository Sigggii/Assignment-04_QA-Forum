import { Component, EventEmitter, Input, Output } from '@angular/core'
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm'
import { provideIcons } from '@ng-icons/core'
import { lucideBadgeCheck } from '@ng-icons/lucide'
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm'

@Component({
    selector: 'app-approved-badge',
    standalone: true,
    imports: [HlmIconComponent, HlmButtonDirective],
    templateUrl: './approved-badge.component.html',
    styleUrl: './approved-badge.component.css',
    providers: [provideIcons({ lucideBadgeCheck })],
})
export class ApprovedBadgeComponent {
    @Input({ required: true }) approved!: boolean
    @Input({ required: true }) editable!: boolean
    @Output()
    approve: EventEmitter<boolean> = new EventEmitter<boolean>()

    handleClick = () => {
        const approved = !this.approved
        this.approved = approved
        this.approve.emit(approved)
    }
}
