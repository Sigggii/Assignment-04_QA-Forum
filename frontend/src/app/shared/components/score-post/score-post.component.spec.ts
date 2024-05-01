import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScorePostComponent } from './score-post.component';

describe('ScorePostComponent', () => {
  let component: ScorePostComponent;
  let fixture: ComponentFixture<ScorePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScorePostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScorePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
