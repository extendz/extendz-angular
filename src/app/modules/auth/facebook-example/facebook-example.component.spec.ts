import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookExampleComponent } from './facebook-example.component';

describe('FacebookExampleComponent', () => {
  let component: FacebookExampleComponent;
  let fixture: ComponentFixture<FacebookExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacebookExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacebookExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
