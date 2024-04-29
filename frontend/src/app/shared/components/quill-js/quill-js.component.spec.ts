import { ComponentFixture, TestBed } from '@angular/core/testing'

import { QuillJsComponent } from './quill-js.component'

describe('QuillJsComponent', () => {
  let component: QuillJsComponent;
  let fixture: ComponentFixture<QuillJsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuillJsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuillJsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
