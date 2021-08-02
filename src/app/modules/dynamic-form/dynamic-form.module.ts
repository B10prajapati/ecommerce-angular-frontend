import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { DragAndDropUploadDirective } from './drag-and-drop-upload/directives/drag-and-drop-upload.directive';
import { DragAndDropUploadComponent } from './drag-and-drop-upload/drag-and-drop-upload.component';
import { DynamicFormInputComponent } from './dynamic-form-input/dynamic-form-input.component';
import { DynamicFormComponent } from './dynamic-form.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    DynamicFormInputComponent,
    DynamicFormComponent,
    DragAndDropUploadComponent,
    DragAndDropUploadDirective,
  ],
  imports: [
    CommonModule,

    ReactiveFormsModule,
    MatProgressBarModule,
    MatRadioModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
  ],
  exports: [
    DynamicFormComponent,
    DynamicFormInputComponent,
    DragAndDropUploadComponent,
  ],
})
export class DynamicFormModule {}
