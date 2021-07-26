import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { FormField } from 'src/app/components/dynamic-form/form-field';

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
        label: 'Username',
        required: true,
        order: 1,
      }),

      new FormField<string>({
        controlType: 'password',
        key: 'password',
        label: 'Password',
        type: 'password',
        required: true,
        order: 3,
      }),

      // new FormField<string>({
      //   controlType: 'dropdown',
      //   key: 'role',
      //   label: 'Role',
      //   options: [
      //     { key: 'admin', value: 'Admin' },
      //     { key: 'user', value: 'User' },
      //   ],
      //   order: 3,
      // }),
    ];

    return of(inputs.sort((a, b) => a.order - b.order));
  }
}
