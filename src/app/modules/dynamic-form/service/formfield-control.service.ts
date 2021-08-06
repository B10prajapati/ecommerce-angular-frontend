import { Injectable } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { FormField } from '../form-field';

// https://danielk.tech/home/how-to-build-a-dynamic-angular-form
@Injectable({
  providedIn: 'root',
})
export class FormfieldControlService {
  constructor() {}

  toFormGroup(inputs: FormField<string | number | boolean>[]): FormGroup {
    const group: any = {};

    inputs.forEach((input) => {
      let validator: ValidatorFn[] = input.required
        ? [Validators.required]
        : [];
      switch (input.validator) {
        case 'email':
          validator.push(Validators.email);
          break;
        default:
          break;
      }
      group[input.key] =
        validator.length > 0
          ? new FormControl(input.value || '', validator)
          : new FormControl(input.value || '');
    });
    console.log(group);
    return new FormGroup(group);
  }
}
