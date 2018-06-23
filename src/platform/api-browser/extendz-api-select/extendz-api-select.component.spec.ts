import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendzApiSelectComponent } from './extendz-api-select.component';

describe('ExtendzApiSelectComponent', () => {
  let component: ExtendzApiSelectComponent;
  let fixture: ComponentFixture<ExtendzApiSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendzApiSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendzApiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
