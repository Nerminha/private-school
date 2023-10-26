import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashStudentComponent } from './dash-student.component';

describe('DashStudentComponent', () => {
  let component: DashStudentComponent;
  let fixture: ComponentFixture<DashStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
