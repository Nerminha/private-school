import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestEducationComponent } from './best-education.component';

describe('BestEducationComponent', () => {
  let component: BestEducationComponent;
  let fixture: ComponentFixture<BestEducationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestEducationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
