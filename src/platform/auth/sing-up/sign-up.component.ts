/**
 *    Copyright 2018 the original author or authors
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

import { Component, OnInit } from '@angular/core';
import { SingUpConfig, FieldType, Field } from './models/singUp.config';
import { FormGroup, FormBuilder, ValidatorFn, Validators, FormControl } from '@angular/forms';
import { ExtendzFormGroup } from './formGroup';
import { ExtendzFormBuilder } from './formBuilder';
import { SingUpService } from './sign-up.service';

export function getConfirmFielTitle(field: Field) {
  return `Confirm${field.title}`;
}

@Component({
  selector: 'ext-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  /**
   * Sign up form
   */
  public signUpFormGroup: ExtendzFormGroup;
  /**
   * Fields for the given form. Not using the direct form config since there can be modifications.
   */
  public fields: Field[] = [];

  constructor(
    private formBuilder: ExtendzFormBuilder,
    public config: SingUpConfig,
    private service: SingUpService
  ) {
    this.createForm();
  }

  ngOnInit() {}
  /**
   * Create the singup form
   */
  private createForm(): void {
    this.signUpFormGroup = this.formBuilder.extGroup({}, { validator: this.matchPassword });
    this.signUpFormGroup.feilds = this.config.fields;

    this.config.fields.forEach(field => {
      let validators: ValidatorFn[] = [];
      // Apply validators
      if (field.min) validators.push(Validators.minLength(field.min));
      if (field.max) validators.push(Validators.maxLength(field.max));
      if (field.pattern) validators.push(Validators.pattern(field.pattern.pattern));
      if (field.required) validators.push(Validators.required);

      let ctrl: FormControl = new FormControl(null, validators);
      this.signUpFormGroup.addControl(field.title, ctrl);

      this.fields.push(field);
      // Password feilds automatically will have a confirm password feild
      if (field.type == FieldType.Password) {
        let title = getConfirmFielTitle(field);
        let confirmField = { ...field };
        confirmField.title = title;
        this.fields.push(confirmField);
        let confiCtrl = new FormControl(null, validators);
        this.signUpFormGroup.addControl(title, confiCtrl);
      }
    });
  } // createForm

  private matchPassword(formGroup: ExtendzFormGroup): void {
    if (formGroup.feilds)
      formGroup.feilds.filter(f => f.type == FieldType.Password).forEach(field => {
        let p = formGroup.get(field.title);
        let pc = formGroup.get(getConfirmFielTitle(field));
        if (p && p.value && pc && pc.value) {
          if (p.value != pc.value) {
            pc.setErrors({
              mismatchWith: field.title
            });
          }
        }
      });
  } // matchPassword()

  public signUp(): void {}
} // class
