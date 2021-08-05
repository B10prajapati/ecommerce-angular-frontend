import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormfieldControlService } from './modules/dynamic-form/service/formfield-control.service';
import { AuthService } from './service/backend/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [FormfieldControlService],
})
export class AppComponent {
  isLoggedIn = false;
  constructor(public router: Router, private auth: AuthService) {
    this.router.events.subscribe((val) => {
      this.isLoggedIn = this.auth.isLoggedIn();
    });
  }
}
