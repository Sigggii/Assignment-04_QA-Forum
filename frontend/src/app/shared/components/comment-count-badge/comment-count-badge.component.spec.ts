import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentCountBadgeComponent } from './comment-count-badge.component';

describe('CommentCountBadgeComponent', () => {
  let component: CommentCountBadgeComponent;
  let fixture: ComponentFixture<CommentCountBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentCountBadgeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommentCountBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
