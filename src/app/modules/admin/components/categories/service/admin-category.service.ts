import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { FormField } from 'src/app/modules/dynamic-form/form-field';

// https://danielk.tech/home/how-to-build-a-dynamic-angular-form
@Injectable({
  providedIn: 'root',
})
export class AdminCategoryService {
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
    ];

    return of(inputs.sort((a, b) => a.order - b.order));
  }
}
