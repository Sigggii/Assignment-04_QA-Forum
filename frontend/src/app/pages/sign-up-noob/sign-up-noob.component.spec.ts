import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpNoobComponent } from './sign-up-noob.component';

describe('SignUpNoobComponent', () => {
  let component: SignUpNoobComponent;
  let fixture: ComponentFixture<SignUpNoobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpNoobComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignUpNoobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
