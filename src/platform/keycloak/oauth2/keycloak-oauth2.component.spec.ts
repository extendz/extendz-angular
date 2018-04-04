import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeycloakOauth2Component } from './keycloak-oauth2.component';

describe('KeycloakOauth2Component', () => {
  let component: KeycloakOauth2Component;
  let fixture: ComponentFixture<KeycloakOauth2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeycloakOauth2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeycloakOauth2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
