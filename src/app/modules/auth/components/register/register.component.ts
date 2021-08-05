import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormField } from 'src/app/modules/dynamic-form/form-field';
import { AuthResult } from 'src/app/service/backend/auth.service';
import { CustomerAuthService } from '../../service/customer-auth.service';
import { RegisterFormfieldControlService } from './service/registerformfield-control.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  // Roles: any = ['Admin', 'User'];
  formFields: Observable<FormField<any>[]>;

  constructor(
    service: RegisterFormfieldControlService,
    private auth: CustomerAuthService
  ) {
    this.formFields = service.getFormFields();
  }

  ngOnInit(): void {}

  addData(data: any) {
    const { name, password } = data;
    if (name && password)
      this.auth
        .register({
          username: data.name,
          password: data.password,
        })
        .subscribe((data: AuthResult) => {
          this.auth.setToken('auth-token', data.data.payload.token);
          this.auth.setToken('refresh-token', data.data.payload.refresh_token);
        });
    else alert('Details supplied are invalid.');
  }
}
