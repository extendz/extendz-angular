import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingupExampleComponent } from './singup-example.component';

describe('SingupExampleComponent', () => {
  let component: SingupExampleComponent;
  let fixture: ComponentFixture<SingupExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingupExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingupExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
