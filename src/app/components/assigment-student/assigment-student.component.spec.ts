import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigmentStudentComponent } from './assigment-student.component';

describe('AssigmentStudentComponent', () => {
  let component: AssigmentStudentComponent;
  let fixture: ComponentFixture<AssigmentStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssigmentStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssigmentStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
