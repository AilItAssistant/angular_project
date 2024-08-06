import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageExamsResultsComponent } from './manage-exams-results.component';

describe('ManageExamsResultsComponent', () => {
  let component: ManageExamsResultsComponent;
  let fixture: ComponentFixture<ManageExamsResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageExamsResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageExamsResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
