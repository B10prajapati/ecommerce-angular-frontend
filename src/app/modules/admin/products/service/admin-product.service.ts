import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { FormField } from 'src/app/components/dynamic-form/form-field';
import { ProductsService } from 'src/app/modules/products/service/products.service';

// https://danielk.tech/home/how-to-build-a-dynamic-angular-form
@Injectable({
  providedIn: 'root',
})
export class AdminProductService extends ProductsService {
  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }
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
        controlType: 'dropdown',
        key: 'country',
        label: 'Country',
        options: [
          { key: 'usa', value: 'United States of America' },
          { key: 'br', value: 'Brazil' },
          { key: 'other', value: 'Other' },
        ],
        order: 3,
      }),

      new FormField<string>({
        controlType: 'checkbox',
        key: 'agree',
        label: 'I accept terms and services',
        type: 'checkbox',
        required: true,
        order: 4,
      }),

      new FormField<string>({
        controlType: 'radio',
        key: 'sex',
        label: 'Sex',
        type: 'radio',
        options: [
          { key: 'male', value: 'Male' },
          { key: 'female', value: 'Female' },
        ],
        order: 5,
      }),

      new FormField<string>({
        controlType: 'textarea',
        key: 'message',
        label: 'Mesage',
        type: 'textarea',
        order: 6,
      }),
    ];

    return of(inputs.sort((a, b) => a.order - b.order));
  }
}
