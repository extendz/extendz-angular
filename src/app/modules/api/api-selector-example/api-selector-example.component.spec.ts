import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiSelectorExampleComponent } from './api-selector-example.component';

describe('ApiSelectorExampleComponent', () => {
  let component: ApiSelectorExampleComponent;
  let fixture: ComponentFixture<ApiSelectorExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiSelectorExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiSelectorExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
