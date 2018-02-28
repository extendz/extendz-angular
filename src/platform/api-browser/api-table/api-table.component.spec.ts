import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiTableComponent } from './api-table.component';

describe('ApiTableComponent', () => {
  let component: ApiTableComponent;
  let fixture: ComponentFixture<ApiTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
