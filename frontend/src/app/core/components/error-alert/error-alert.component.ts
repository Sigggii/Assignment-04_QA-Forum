import { Component } from '@angular/core'
import { HlmToasterComponent } from '@spartan-ng/ui-sonner-helm'

@Component({
    selector: 'app-error-alert',
    standalone: true,
    imports: [HlmToasterComponent],
    templateUrl: './error-alert.component.html',
    styleUrl: './error-alert.component.css',
})
export class ErrorAlertComponent {
    protected readonly HlmToasterComponent = HlmToasterComponent
}
