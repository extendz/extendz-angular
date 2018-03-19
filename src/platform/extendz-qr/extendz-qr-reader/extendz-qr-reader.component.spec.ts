import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendzQrReaderComponent } from './extendz-qr-reader.component';

describe('ExtendzQrReaderComponent', () => {
  let component: ExtendzQrReaderComponent;
  let fixture: ComponentFixture<ExtendzQrReaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendzQrReaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendzQrReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
