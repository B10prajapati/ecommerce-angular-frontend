import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { FormField } from '../../dynamic-form/form-field';

// https://danielk.tech/home/how-to-build-a-dynamic-angular-form
@Injectable({
  providedIn: 'root',
})
export class RegisterFormfieldControlService {
  constructor() {}
  getFormFields() {
    const inputs: FormField<string>[] = [
      new FormField<string>({
        controlType: 'textbox',
        key: 'name',
        label: 'Name',
        required: true,
        order: 1,
      }),

      new FormField<string>({
        controlType: 'textbox',
        key: 'email',
        label: 'Email',
        type: 'email',
        required: true,
        validator: 'email',
        order: 2,
      }),
      new FormField<string>({
        controlType: 'textbox',
        key: 'password',
        label: 'Password',
        type: 'password',
        required: true,
        order: 3,
      }),

      new FormField<string>({
        controlType: 'dropdown',
        key: 'role',
        label: 'Role',
        options: [
          { key: 'admin', value: 'Admin' },
          { key: 'author', value: 'Author' },
          { key: 'reader', value: 'Reader' },
        ],
        order: 3,
      }),
    ];

    return of(inputs.sort((a, b) => a.order - b.order));
  }
}
