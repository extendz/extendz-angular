import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrreaderexampleComponent } from './qrreaderexample.component';

describe('QrreaderexampleComponent', () => {
  let component: QrreaderexampleComponent;
  let fixture: ComponentFixture<QrreaderexampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrreaderexampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrreaderexampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
