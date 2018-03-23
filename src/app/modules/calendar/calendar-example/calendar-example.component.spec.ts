import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarExampleComponent } from './calendar-example.component';

describe('CalendarExampleComponent', () => {
  let component: CalendarExampleComponent;
  let fixture: ComponentFixture<CalendarExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
