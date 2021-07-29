import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LogInComponent } from 'src/app/modules/auth/components/log-in/log-in.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [LogInComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    AngularMaterialModule,
    DynamicFormModule,
  ],
  exports: [LogInComponent, RegisterComponent],
})
export class AuthModule {}
