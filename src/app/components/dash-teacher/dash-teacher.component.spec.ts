import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashTeacherComponent } from './dash-teacher.component';

describe('DashTeacherComponent', () => {
  let component: DashTeacherComponent;
  let fixture: ComponentFixture<DashTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
