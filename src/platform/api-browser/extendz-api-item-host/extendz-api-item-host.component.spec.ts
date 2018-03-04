import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendzApiItemHostComponent } from './extendz-api-item-host.component';

describe('ExtendzApiItemHostComponent', () => {
  let component: ExtendzApiItemHostComponent;
  let fixture: ComponentFixture<ExtendzApiItemHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendzApiItemHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendzApiItemHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
