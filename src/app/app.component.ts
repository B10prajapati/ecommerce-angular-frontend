import { Component } from '@angular/core';
import { FormfieldControlService } from './components/dynamic-form/service/formfield-control.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [FormfieldControlService],
})
export class AppComponent {}
