import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import decode from 'jwt-decode';
import { AuthService } from '../backend/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  redirectUrl = '/';
  constructor(private auth: AuthService, private router: Router) {}

  set changeRedirectUrl(url: string) {
    this.redirectUrl = url;
  }
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

      const token = this.auth.getToken('auth-token');
      const refreshToken = this.auth.getToken('refresh-token');

      console.log(token);
      // Allow passthrough if either it is not expired and refresh token exits
      if (token) {
        const decodedToken = decode(token) as { exp: number };

        console.log(Date.now() < 1000 * decodedToken.exp);
        // Token not expired or refresh token exits
        if (Date.now() < 1000 * decodedToken.exp || refreshToken) {
          return true;
        }

        // this.refresh(urlPath);
      } else if (refreshToken) {
        return true;
      }

      this.router?.navigateByUrl(this.redirectUrl);

      return false;
      // }

      // return true;
    } catch (err) {
      console.log(err);
      this.router?.navigateByUrl(this.redirectUrl);

      return false;
    }
  }
}
