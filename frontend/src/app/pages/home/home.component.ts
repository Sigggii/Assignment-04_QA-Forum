import { Component } from '@angular/core'
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm'

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [HlmButtonDirective],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent {}
