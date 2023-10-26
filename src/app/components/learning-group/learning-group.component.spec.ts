import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningGroupComponent } from './learning-group.component';

describe('LearningGroupComponent', () => {
  let component: LearningGroupComponent;
  let fixture: ComponentFixture<LearningGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
