import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiRootExampleComponent } from './api-root-example.component';

describe('ApiRootExampleComponent', () => {
  let component: ApiRootExampleComponent;
  let fixture: ComponentFixture<ApiRootExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiRootExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiRootExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
