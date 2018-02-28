import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiTableHostComponent } from './api-table-host.component';

describe('ApiTableHostComponent', () => {
  let component: ApiTableHostComponent;
  let fixture: ComponentFixture<ApiTableHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiTableHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiTableHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
