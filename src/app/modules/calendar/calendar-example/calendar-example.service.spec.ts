import { TestBed, inject } from '@angular/core/testing';

import { CalendarExampleService } from './calendar-example.service';

describe('CalendarExampleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarExampleService]
    });
  });

  it('should be created', inject([CalendarExampleService], (service: CalendarExampleService) => {
    expect(service).toBeTruthy();
  }));
});
