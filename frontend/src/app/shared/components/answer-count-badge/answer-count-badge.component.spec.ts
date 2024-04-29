import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AnswerCountBadgeComponent } from './answer-count-badge.component'

describe('CommentCountBadgeComponent', () => {
    let component: AnswerCountBadgeComponent
    let fixture: ComponentFixture<AnswerCountBadgeComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AnswerCountBadgeComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(AnswerCountBadgeComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
