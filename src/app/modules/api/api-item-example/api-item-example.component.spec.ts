import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiItemExampleComponent } from './api-item-example.component';

describe('ApiItemExampleComponent', () => {
  let component: ApiItemExampleComponent;
  let fixture: ComponentFixture<ApiItemExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiItemExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiItemExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
