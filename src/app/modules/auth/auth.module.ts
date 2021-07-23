import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormInputComponent } from 'src/app/components/dynamic-form/dynamic-form-input/dynamic-form-input.component';
import { DynamicFormComponent } from 'src/app/components/dynamic-form/dynamic-form.component';
import { LogInComponent } from '../../components/log-in/log-in.component';
import { RegisterComponent } from '../../components/register/register.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [
    AuthComponent,
    RegisterComponent,
    LogInComponent,
    DynamicFormInputComponent,
    DynamicFormComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule {}
