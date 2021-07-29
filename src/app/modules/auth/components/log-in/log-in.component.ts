import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { FormField } from 'src/app/modules/dynamic-form/form-field';
import { AuthResult, AuthService } from 'src/app/service/backend/auth.service';
import { LoginFormfieldControlService } from './service/loginformfield-control.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent {
  title = 'AngularDynamicForms';
  formFields: Observable<FormField<any>[]>;

  // loginForm: FormGroup;

  constructor(
    service: LoginFormfieldControlService,
    private auth: AuthService,
    private cookie: CookieService,
    private router: Router
  ) {
    this.formFields = service.getFormFields();

    // this.loginForm = this.reactiveForm();
  }

  // reactiveForm() {
  //   return this.fb.group({
  //     email: this.fb.control('', [Validators.required, Validators.email]),
  //     password: this.fb.control('', [
  //       Validators.required,
  //       Validators.pattern('^[a-zA-Z0-9]{8,}$'),
  //     ]),
  //   });
  // }

  // submitForm() {
  //   console.log(this.loginForm?.value);
  // }

  // public errorHandling = (control: string, error: string) => {
  //   return this.loginForm?.controls[control].hasError(error);
  // };

  addData(data: any) {
    console.log(data);
    try {
      const { name, password } = data;
      if (name && password)
        this.auth
          ?.login({
            username: data.name,
            password: data.password,
          })
          .subscribe(
            (data: AuthResult) => {
              console.log(data);
              this.cookie.set('auth-token', data.data.payload.token);
              this.cookie.set(
                'refresh-token',
                data.data.payload.refresh_token!
              );
            },
            (err) => {
              console.log(err);
            },
            () => {
              this.router.navigateByUrl('');
            }
          );
      else alert('Details supplied are invalid.');
    } catch (err) {
      console.log('whas', err);
    }
  }
}
