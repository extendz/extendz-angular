import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiItemBasicComponent } from './api-item-basic.component';

describe('ApiItemBasicComponent', () => {
  let component: ApiItemBasicComponent;
  let fixture: ComponentFixture<ApiItemBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiItemBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiItemBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
