import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendzCalendarComponent } from './extendz-calendar.component';

describe('ExtendzCalendarComponent', () => {
  let component: ExtendzCalendarComponent;
  let fixture: ComponentFixture<ExtendzCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendzCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendzCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
