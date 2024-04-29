import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerRatingBadgeComponent } from './answer-rating-badge.component';

describe('AnswerRatingBadgeComponent', () => {
  let component: AnswerRatingBadgeComponent;
  let fixture: ComponentFixture<AnswerRatingBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnswerRatingBadgeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnswerRatingBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
