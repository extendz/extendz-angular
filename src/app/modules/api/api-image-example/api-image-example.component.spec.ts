import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiImageExampleComponent } from './api-image-example.component';

describe('ApiImageExampleComponent', () => {
  let component: ApiImageExampleComponent;
  let fixture: ComponentFixture<ApiImageExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiImageExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiImageExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
