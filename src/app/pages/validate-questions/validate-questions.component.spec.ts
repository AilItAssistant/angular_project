import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateQuestionsComponent } from './validate-questions.component';

describe('ValidateQuestionsComponent', () => {
  let component: ValidateQuestionsComponent;
  let fixture: ComponentFixture<ValidateQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidateQuestionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidateQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
