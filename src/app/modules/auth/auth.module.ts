import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormInputComponent } from 'src/app/components/dynamic-form/dynamic-form-input/dynamic-form-input.component';
import { DynamicFormComponent } from 'src/app/components/dynamic-form/dynamic-form.component';
import { LogInComponent } from 'src/app/modules/auth/components/log-in/log-in.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    AuthComponent,
    LogInComponent,
    RegisterComponent,
    DynamicFormInputComponent,
    DynamicFormComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule {}
