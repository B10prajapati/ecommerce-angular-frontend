import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
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
export class DynamicFormComponent implements OnInit, OnChanges {
  @Input() formFields: FormField<string>[] | null = [];
  @Input() buttonLabel: string = 'Save';
  @Input() value: {
    [key: string]: any;
  } = {};
  @Input() formGroup?: FormGroup;
  public reset = false;

  @Output() formData = new EventEmitter();

  constructor(private formfieldService: FormfieldControlService) {}

  ngOnInit(): void {
    if (!this.formGroup)
      this.formGroup = this.formfieldService.toFormGroup(this.formFields!);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.reset = !this.reset;

    if (changes.value)
      if (this.formGroup) this.formGroup.setValue(changes.value.currentValue);
  }

  onSubmit() {
    this.formData.emit(this.formGroup?.getRawValue());
    this.formGroup?.reset();
    this.reset = !this.reset;
  }
  onReset() {
    this.formGroup?.reset();
    this.reset = !this.reset;
  }
}
