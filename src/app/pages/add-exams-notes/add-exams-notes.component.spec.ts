import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExamsNotesComponent } from './add-exams-notes.component';

describe('AddExamsNotesComponent', () => {
  let component: AddExamsNotesComponent;
  let fixture: ComponentFixture<AddExamsNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddExamsNotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddExamsNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
