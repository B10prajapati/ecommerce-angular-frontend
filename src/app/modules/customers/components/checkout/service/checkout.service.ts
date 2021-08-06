import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { FormField } from 'src/app/modules/dynamic-form/form-field';
import { FormfieldControlService } from 'src/app/modules/dynamic-form/service/formfield-control.service';

// https://danielk.tech/home/how-to-build-a-dynamic-angular-form
export interface StepperInfo {
  label: string;
  formFields: FormField<string>[];
  formGroup: FormGroup;
  state: string;
}
@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private formFieldService: FormfieldControlService
  ) {
    // super(httpClient, cookieService);
  }

  getStepperData(): StepperInfo[] {
    const info = [];
    info.push(this.getUserFormFields());
    info.push(this.getAddressDetails());
    info.push(this.getBillingDetails());

    return info;
  }

  getUserFormFields(): StepperInfo {
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
        type: 'string',
        required: true,
        order: 2,
      }),
      new FormField<string>({
        controlType: 'textbox',
        key: 'phone',
        label: 'Mobile Number',
        type: 'tel',
        required: true,
        order: 3,
      }),
    ].sort((a, b) => a.order - b.order);

    const group = this.formFieldService.toFormGroup(inputs);

    return {
      label: 'User Details',
      formFields: inputs,
      formGroup: group,
      state: 'account_circle',
    };
  }

  getAddressDetails(): StepperInfo {
    const inputs: FormField<string>[] = [
      new FormField<string>({
        controlType: 'textbox',
        key: 'street',
        label: 'Street',
        required: true,
        order: 1,
      }),

      new FormField<string>({
        controlType: 'textbox',
        key: 'city',
        label: 'City',
        type: 'string',
        required: true,
        order: 2,
      }),
      new FormField<string>({
        controlType: 'textbox',
        key: 'disctrict',
        label: 'District',
        type: 'string',
        required: true,
        order: 2,
      }),

      new FormField<string>({
        controlType: 'textbox',
        key: 'state',
        label: 'State',
        type: 'string',
        required: true,
        order: 2,
      }),
      new FormField<string>({
        controlType: 'textarea',
        key: 'landmark',
        label: 'Distinguishable Landmark',
        type: 'string',
        required: true,
        order: 2,
      }),
    ].sort((a, b) => a.order - b.order);

    const group = this.formFieldService.toFormGroup(inputs);

    return {
      label: 'Address Details',
      formFields: inputs,
      formGroup: group,
      state: 'home',
    };
  }

  getBillingDetails(): StepperInfo {
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
        key: 'price',
        label: 'Price',
        type: 'number',
        required: true,
        order: 2,
      }),
    ].sort((a, b) => a.order - b.order);

    const group = this.formFieldService.toFormGroup(inputs);

    return {
      label: 'Billing Details',
      formFields: inputs,
      formGroup: group,
      state: 'credit_card',
    };
  }
}
