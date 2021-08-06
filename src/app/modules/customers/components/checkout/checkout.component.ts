import { BreakpointObserver } from '@angular/cdk/layout';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormfieldControlService } from 'src/app/modules/dynamic-form/service/formfield-control.service';
import { CheckoutService, StepperInfo } from './service/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class CheckoutComponent implements OnInit {
  stepperOrientation: Observable<StepperOrientation>;

  stepperInfo: StepperInfo[] = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private checkoutService: CheckoutService,
    private formFieldService: FormfieldControlService
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));

    this.stepperInfo = this.checkoutService.getStepperData();
  }

  async ngOnInit() {}

  addData(data: any) {
    console.log(data);
  }
}
