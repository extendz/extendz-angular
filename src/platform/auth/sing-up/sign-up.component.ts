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

import {
  Component,
  OnDestroy,
  Output,
  EventEmitter,
  Input,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, ValidatorFn, Validators, FormControl } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';
import { take } from 'rxjs/operators/take';
import { finalize } from 'rxjs/operators/finalize';

import { SingUpConfig, FieldType, Field } from './models/singUp.config';
import { ExtendzFormGroup } from './formGroup';
import { ExtendzFormBuilder } from './formBuilder';
import { SingUpService } from './sign-up.service';
import { ObjectWithLinks } from '../../common';

export function getConfirmFielTitle(field: Field) {
  return `Confirm ${field.title}`;
}

export function getConfirmFieldName(field: Field) {
  return `confirm${field.name}`;
}

@Component({
  selector: 'ext-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnDestroy {
  /** Sign up form  */
  public signUpFormGroup: ExtendzFormGroup;
  /**  Fields for the given form. Not using the direct form config since there can be modifications.   */
  public fields: Field[] = [];
  /** Subscriptions */
  public all$: Subscription;
  /** Sign up Form  */
  @Input() form: ExtendzFormGroup;
  @Output() formChange: EventEmitter<ExtendzFormGroup> = new EventEmitter();

  /** Success Event */
  @Output() success: EventEmitter<object> = new EventEmitter();

  constructor(
    private formBuilder: ExtendzFormBuilder,
    public config: SingUpConfig,
    private service: SingUpService,
    private snackBar: MatSnackBar
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.formChange.emit(this.signUpFormGroup);
    });
  }

  ngOnDestroy(): void {
    if (this.all$) this.all$.unsubscribe();
  }
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
      this.signUpFormGroup.addControl(field.name, ctrl);

      this.fields.push(field);
      // Password feilds automatically will have a confirm password feild
      if (field.type == FieldType.Password) {
        let name = getConfirmFieldName(field);
        // Make a clone of the field
        let confirmField = { ...field };
        confirmField.title = getConfirmFielTitle(field);
        confirmField.name = name;
        this.fields.push(confirmField);
        let confiCtrl = new FormControl(null, validators);
        this.signUpFormGroup.addControl(name, confiCtrl);
      }
    });
  } // createForm

  private matchPassword(formGroup: ExtendzFormGroup): void {
    if (formGroup.feilds)
      formGroup.feilds.filter(f => f.type == FieldType.Password).forEach(field => {
        let p = formGroup.get(field.name);
        let pc = formGroup.get(getConfirmFieldName(field));
        if (p && p.value && pc && pc.value) {
          if (p.value != pc.value) {
            pc.setErrors({
              mismatchWith: field.title
            });
          }
        }
      });
  } // matchPassword()

  public signUp(): void {
    if (this.signUpFormGroup.valid) {
      let sub = this.service
        .postSignUp(this.signUpFormGroup.value)
        .pipe(
          take(1),
          finalize(() => {
            sub.unsubscribe();
          })
        )
        .subscribe(
          (user: ObjectWithLinks) => {
            this.success.emit(user);
          },
          (error: HttpErrorResponse) => {
            if (error.status == 409) {
              this.snackBar.open('User name already taken.Please try another.', null, {
                duration: 3000
              });
            }
          }
        );
    }
  } // signUp()
} // class
