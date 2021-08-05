import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/backend/auth.service';
import { AuthGuard } from 'src/app/service/guard/auth.guard';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard extends AuthGuard {
  constructor(private authService: AuthService, private routeHandler: Router) {
    super(authService, routeHandler);
    this.changeRedirectUrl = '/admin/login';
  }
}
