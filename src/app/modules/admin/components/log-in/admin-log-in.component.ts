import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormField } from 'src/app/modules/dynamic-form/form-field';
import { AuthResult, AuthService } from 'src/app/service/backend/auth.service';
import { LoginFormfieldControlService } from './service/loginformfield-control.service';

@Component({
  selector: 'admin-log-in',
  templateUrl: './admin-log-in.component.html',
  styleUrls: ['./admin-log-in.component.scss'],
})
export class AdminLogInComponent {
  title = 'AngularDynamicForms';
  formFields: Observable<FormField<any>[]>;

  constructor(
    service: LoginFormfieldControlService,
    private auth: AuthService,
    private router: Router
  ) {
    this.formFields = service.getFormFields();
  }

  addData(data: any) {
    console.log(data);
    try {
      const { name, password } = data;
      if (name && password)
        this.auth
          .login({
            username: data.name,
            password: data.password,
          })
          .subscribe(
            (data: AuthResult) => {
              this.auth.setToken('auth-token', data.data.payload.token);
              this.auth.setToken(
                'refresh-token',
                data.data.payload.refresh_token
              );
            },
            (err) => {
              console.log(err);
            },
            () => {
              this.router.navigateByUrl('admin/dashboard');
            }
          );
      else alert('Details supplied are invalid.');
    } catch (err) {
      console.log('whas', err);
    }
  }
}
