import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingStudentComponent } from './rating-student.component';

describe('RatingStudentComponent', () => {
  let component: RatingStudentComponent;
  let fixture: ComponentFixture<RatingStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
