import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TagBadgeComponent } from './tag-badge.component'

describe('TagBadgeComponent', () => {
    let component: TagBadgeComponent
    let fixture: ComponentFixture<TagBadgeComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TagBadgeComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(TagBadgeComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
