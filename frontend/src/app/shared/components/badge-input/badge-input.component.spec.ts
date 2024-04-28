import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BadgeInputComponent } from './badge-input.component'

describe('CategoryInputComponent', () => {
    let component: BadgeInputComponent
    let fixture: ComponentFixture<BadgeInputComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BadgeInputComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(BadgeInputComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
