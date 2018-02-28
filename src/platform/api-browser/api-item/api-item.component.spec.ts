import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiItemComponent } from './api-item.component';

describe('ApiItemComponent', () => {
  let component: ApiItemComponent;
  let fixture: ComponentFixture<ApiItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
