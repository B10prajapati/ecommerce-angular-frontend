import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { of } from 'rxjs';
import { FormField } from 'src/app/modules/dynamic-form/form-field';
import { ProductsService } from 'src/app/service/backend/products.service';

// https://danielk.tech/home/how-to-build-a-dynamic-angular-form
@Injectable({
  providedIn: 'root',
})
export class AdminProductService extends ProductsService {
  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {
    super(httpClient, cookieService);
  }

  getFormFields() {
    const inputs: FormField<string | number | boolean>[] = [
      new FormField<string>({
        controlType: 'textbox',
        key: 'name',
        label: 'Name',
        required: true,
        order: 1,
      }),

      new FormField<number>({
        controlType: 'textbox',
        key: 'price',
        label: 'Price',
        type: 'number',
        required: true,
        order: 2,
      }),
      new FormField<string>({
        controlType: 'textbox',
        key: 'description',
        label: 'Description',
        type: 'string',
        required: true,
        order: 3,
        value: '',
      }),

      new FormField<boolean>({
        controlType: 'checkbox',
        key: 'isActive',
        label: 'Active',
        type: 'boolean',

        value: true,
        order: 4,
      }),
      new FormField({
        controlType: 'upload',
        key: 'images',
        order: 5,
        value: '',
      }),
    ];

    return of(inputs.sort((a, b) => a.order - b.order));
  }
}
