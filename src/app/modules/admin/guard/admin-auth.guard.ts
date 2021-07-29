import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/service/backend/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private cookie: CookieService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    try {
      // https://stackoverflow.com/questions/49806553/angular-how-to-call-router-navigate-relative-to-target-route-in-a-routeguard
      // Extract active path from route inorder to reload after access/auth token refreshed
      // console.log('Route', urlPath);
      const urlPath = route.pathFromRoot
        .filter((p) => p.url !== null && p.url.length > 0)
        .reduce(
          (arr, p) => arr.concat(p.url.map((u) => u.path)),
          new Array<string>()
        )
        .join('/');
      console.log(urlPath);

      const token = this.cookie.get('auth-token');

      console.log(token);
      if (token) {
        const decodedToken = decode(token) as { exp: number };

        // Token Expired if statement is true
        if (Date.now() >= 1000 * decodedToken.exp) {
          this.refresh(urlPath);
        } else {
          return true;
        }
      } else {
        this.refresh(urlPath);
      }
      this.router.navigateByUrl('admin/login');

      return false;
    } catch (err) {
      this.router.navigateByUrl('admin/login');

      console.log(err);
      return false;
    }
  }

  refresh(route: string) {
    this.auth.refresh().subscribe(
      (data) => {
        if (data.status === 'success') {
          const { token, refresh_token } = data.data.payload;

          this.cookie.delete('auth-token');
          this.cookie.delete('refresh-token');

          this.cookie.set('auth-token', token);
          this.cookie.set('refresh-token', refresh_token);

          this.router.navigateByUrl(route);
        } else {
          this.router.navigateByUrl('admin/login');
        }
      },
      (err) => {
        this.cookie.deleteAll();
        this.router.navigateByUrl('admin/login');

        console.log(err);
      }
    );
  }
}
