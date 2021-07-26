import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField } from './form-field';
import { FormfieldControlService } from './service/formfield-control.service';

/**
 * Dynamic Form
 * */
// https://danielk.tech/home/how-to-build-a-dynamic-angular-form

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  @Input() formFields: FormField<string>[] | null = [];
  @Input() buttonLabel: string = 'Save';

  @Output() formData = new EventEmitter();

  form!: FormGroup;

  constructor(private formfieldService: FormfieldControlService) {}

  ngOnInit(): void {
    this.form = this.formfieldService.toFormGroup(this.formFields!);
  }

  onSubmit() {
    console.log('He');
    this.formData.emit(this.form.getRawValue());
  }
}
