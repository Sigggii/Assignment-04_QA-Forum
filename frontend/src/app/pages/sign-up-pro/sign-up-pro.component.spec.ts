import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpProComponent } from './sign-up-pro.component';

describe('SignUpProComponent', () => {
  let component: SignUpProComponent;
  let fixture: ComponentFixture<SignUpProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpProComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignUpProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
