import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendzCalendarAdvanceComponent } from './extendz-calendar-advance.component';

describe('ExtendzCalendarAdvanceComponent', () => {
  let component: ExtendzCalendarAdvanceComponent;
  let fixture: ComponentFixture<ExtendzCalendarAdvanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendzCalendarAdvanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendzCalendarAdvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
