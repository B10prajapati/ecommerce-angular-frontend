import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { DynamicFormInputComponent } from './dynamic-form-input/dynamic-form-input.component';
import { DynamicFormComponent } from './dynamic-form.component';

@NgModule({
  declarations: [DynamicFormInputComponent, DynamicFormComponent],
  imports: [CommonModule, AngularMaterialModule, ReactiveFormsModule],
  exports: [DynamicFormComponent, DynamicFormInputComponent],
})
export class DynamicFormModule {}
