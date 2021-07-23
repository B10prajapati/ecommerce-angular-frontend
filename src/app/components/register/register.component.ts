import { Observable } from 'rxjs';
import { RegisterFormfieldControlService } from './service/registerformfield-control.service';
import { Component, OnInit } from '@angular/core';
import { FormField } from '../dynamic-form/form-field';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  Roles: any = ['Admin', 'Author', 'Reader'];
  formFields: Observable<FormField<any>[]>;

  constructor(service: RegisterFormfieldControlService) {
    this.formFields = service.getFormFields();
  }

  ngOnInit(): void {}
}
