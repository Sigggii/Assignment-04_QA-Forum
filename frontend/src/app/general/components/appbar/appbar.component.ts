import { Component } from '@angular/core'
import { provideIcons } from '@ng-icons/core'
import { lucideMenu } from '@ng-icons/lucide'
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm'

@Component({
    selector: 'app-appbar',
    standalone: true,
    imports: [HlmIconComponent],
    templateUrl: './appbar.component.html',
    styleUrl: './appbar.component.css',
    providers: [provideIcons({ lucideMenu })],
})
export class AppbarComponent {}
