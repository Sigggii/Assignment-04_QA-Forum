import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateAnswerComponent } from './rate-answer.component';

describe('RateAnswerComponent', () => {
  let component: RateAnswerComponent;
  let fixture: ComponentFixture<RateAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateAnswerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RateAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
