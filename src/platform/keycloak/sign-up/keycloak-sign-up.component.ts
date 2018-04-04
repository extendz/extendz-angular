import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';

import { mergeMap } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

import { KeycloakSignUpConfig } from './models/keycloak-singup.config';
import { KeycloakSignUpService } from './keycloak-sign-up.service';
import { AccessToken } from '../../auth/common';

@Component({
  selector: 'ext-keycloak-sign-up',
  templateUrl: './keycloak-sign-up.component.html',
  styleUrls: ['./keycloak-sign-up.component.css']
})
export class KeycloakSignUpComponent {
  /**
   * Sign up form
   */
  signUpForm: FormGroup;
  /**
   * All subscriptions
   */
  all$: Subscription;
  /**
   *
   */
  @Output() success: EventEmitter<any> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private service: KeycloakSignUpService,
    private singUpConfig: KeycloakSignUpConfig
  ) {
    this.signUpForm = formBuilder.group({}, { validator: this.matchPassword });
    for (let field of singUpConfig.fields) {
      let validators: ValidatorFn[] = [];
      if (field.min) {
        validators.push(Validators.minLength(field.min));
      }
      if (field.max) {
        validators.push(Validators.maxLength(field.max));
      }
      if (field.pattern) {
        validators.push(Validators.pattern(field.pattern.pattern));
      }
      if (field.required) {
        validators.push(Validators.required);
      }
      let ctrl: FormControl = new FormControl('', validators);
      this.signUpForm.addControl(field.name, ctrl);
      if (field.name == 'password') {
        let confiCtrl = new FormControl('', validators);
        this.signUpForm.addControl('passwordConfirm', confiCtrl);
      }
    }
  } //constructor()

  matchPassword(g: FormGroup): void {
    let passwordField = g.get('password');
    let confirmPasswordFeild = g.get('passwordConfirm');
    if (
      passwordField &&
      passwordField.value &&
      confirmPasswordFeild &&
      confirmPasswordFeild.value
    ) {
      // console.log(passwordField.value, confirmPasswordFeild.value);
      if (passwordField.value != confirmPasswordFeild.value) {
        // console.log('false');
        confirmPasswordFeild.setErrors({ MatchPassword: true });
        // g.get('confirmPassword').setErrors({ MatchPassword: true });
      } else {
        // console.log('true');
      }
    }
  } // matchPassword()

  signUp() {
    if (this.signUpForm.valid) {
      this.all$ = this.service
        .singup()
        .pipe(
          mergeMap((token: AccessToken) =>
            this.service.createUser(this.signUpForm.value, token.access_token)
          )
        )
        .subscribe();
    }
  } //signUp()

  ngOnDestroy(): void {
    this.all$.unsubscribe();
  } // ngOnDestroy()
}
