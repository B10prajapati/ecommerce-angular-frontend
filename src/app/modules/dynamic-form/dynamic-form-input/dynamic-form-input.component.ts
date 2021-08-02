import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ImageFileData } from '../drag-and-drop-upload/drag-and-drop-upload.component';
import { FormField } from '../form-field';

@Component({
  selector: 'app-dynamic-form-input',
  templateUrl: './dynamic-form-input.component.html',
  styleUrls: ['./dynamic-form-input.component.scss'],
})
export class DynamicFormInputComponent {
  @Input() input!: FormField<string>;
  @Input() form!: FormGroup;
  @Input() reset!: boolean;

  public booleanValue = true;
  get isValid() {
    if (this.input?.key) return this.form.controls[this.input.key].valid;
    return false;
  }
  handleFiles(files: ImageFileData[]) {
    const key = this.input.key;

    console.log(files);
    this.form.get(key)?.setValue(files);
  }
}
