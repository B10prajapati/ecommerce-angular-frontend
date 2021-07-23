import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FormField } from '../dynamic-form/form-field';
import { FormfieldControlService } from '../dynamic-form/service/formfield-control.service';
import { LoginFormfieldControlService } from './service/loginformfield-control.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent {
  title = 'AngularDynamicForms';
  formFields: Observable<FormField<any>[]>;

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, service: LoginFormfieldControlService) {
    this.formFields = service.getFormFields();

    this.loginForm = this.reactiveForm();
  }

  reactiveForm() {
    return this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9]{8,}$'),
      ]),
    });
  }

  submitForm() {
    console.log(this.loginForm?.value);
  }

  public errorHandling = (control: string, error: string) => {
    return this.loginForm?.controls[control].hasError(error);
  };
}
