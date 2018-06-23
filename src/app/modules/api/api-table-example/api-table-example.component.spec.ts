import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiTableExampleComponent } from './api-table-example.component';

describe('ApiTableExampleComponent', () => {
  let component: ApiTableExampleComponent;
  let fixture: ComponentFixture<ApiTableExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiTableExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiTableExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
