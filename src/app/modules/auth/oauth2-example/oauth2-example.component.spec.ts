import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Oauth2ExampleComponent } from './oauth2-example.component';

describe('Oauth2ExampleComponent', () => {
  let component: Oauth2ExampleComponent;
  let fixture: ComponentFixture<Oauth2ExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Oauth2ExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Oauth2ExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
