import { Component } from '@angular/core'
import { HlmInputDirective } from '@spartan-ng/ui-input-helm'
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm'
import { ContentComponent } from './components/content/content.component'
import { CategoryInputComponent } from '../../../shared/components/category-input/category-input.component'
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm'

@Component({
    selector: 'app-ask',
    standalone: true,
    imports: [
        HlmInputDirective,
        HlmLabelDirective,
        ContentComponent,
        CategoryInputComponent,
        HlmButtonDirective,
    ],
    templateUrl: './ask.component.html',
    styleUrl: './ask.component.css',
})
export class AskComponent {}
