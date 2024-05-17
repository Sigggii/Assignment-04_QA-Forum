import { Component, inject } from '@angular/core'
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm'
import { NavigationService } from '../../../../core/services/navigation.service'

@Component({
    selector: 'app-hero-section',
    standalone: true,
    imports: [HlmButtonDirective],
    templateUrl: './hero-section.component.html',
    styleUrl: './hero-section.component.css',
})
export class HeroSectionComponent {
    navService = inject(NavigationService)
}
