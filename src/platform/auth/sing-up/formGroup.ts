import { Injectable } from '@angular/core';
import { FormGroup, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { AbstractControlOptions } from '@angular/forms/src/model';
import { Field } from './models/singUp.config';

@Injectable()
export class ExtendzFormGroup extends FormGroup {
  feilds?: Field[];
  constructor(fgroup: FormGroup) {
    super(fgroup.controls, fgroup.validator, fgroup.asyncValidator);
  }
}
