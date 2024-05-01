import { Component, Input } from '@angular/core'
import { QuestionComponent } from './components/question/question.component'

@Component({
    selector: 'app-detail-question',
    standalone: true,
    imports: [QuestionComponent],
    templateUrl: './detail-question.component.html',
    styleUrl: './detail-question.component.css',
})
export class DetailQuestionComponent {
    @Input() questionId: string = ''
}
