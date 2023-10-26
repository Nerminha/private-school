import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentTableComponent } from './parent-table.component';

describe('ParentTableComponent', () => {
  let component: ParentTableComponent;
  let fixture: ComponentFixture<ParentTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
