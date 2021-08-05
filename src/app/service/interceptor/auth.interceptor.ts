import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/service/backend/auth.service';

// https://stackoverflow.com/questions/45202208/angular-4-interceptor-retry-requests-after-token-refresh
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  refreshTokenInProgress = false;

  tokenRefreshedSource = new Subject();
  tokenRefreshed$ = this.tokenRefreshedSource.asObservable();

  constructor(private auth: AuthService, private router: Router) {}

  addAuthHeader(request: HttpRequest<any>) {
    const authHeader = this.auth.getToken('auth-token');
    console.log(authHeader);
    if (authHeader) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${authHeader}`,
        },
      });
    }
    return request;
  }

  refreshToken(): Observable<any> {
    if (this.refreshTokenInProgress) {
      return new Observable((observer) => {
        this.tokenRefreshed$.subscribe(() => {
          observer.next();
          observer.complete();
        });
      });
    } else {
      this.refreshTokenInProgress = true;

      return this.auth.refresh().pipe(
        tap((data) => {
          console.log('Data', data);
          this.auth.setToken('auth-token', data.data.payload.token);
          this.auth.setToken('refresh-token', data.data.payload.refresh_token);

          this.refreshTokenInProgress = false;
          this.tokenRefreshedSource.next();
        }),
        catchError(() => {
          this.refreshTokenInProgress = false;
          this.logout();
          return throwError('Refresh Failed');
        })
      );
    }
  }

  logout() {
    this.auth.logout('/');
  }

  handleResponseError(
    error: HttpErrorResponse,
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {
    console.log(error);

    // Business error
    if (error.status === 400) {
      // Show message
    }

    // Invalid token error
    else if (error.status === 401) {
      if (this.auth.isLoggedIn()) {
        return this.refreshToken().pipe(
          switchMap(() => {
            request = this.addAuthHeader(request!);
            if (next) return next.handle(request);
            else return throwError('HTTP Handler Missing!!');
          }),
          catchError((e) => {
            this.logout();

            return throwError('Refresh Token Invalid');
          })
        );
      } else {
        this.logout();
      }
    }

    // Access denied error
    else if (error.status === 403) {
      // Show message
      // Logout
      this.logout();
    }

    // Server error
    else if (error.status === 500) {
      // Show message
    }

    // Maintenance error
    else if (error.status === 503) {
      // Show message
      // Redirect to the maintenance page
    }

    return throwError(error);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // Handle request
    request = this.addAuthHeader(request);

    // Handle response
    return next.handle(request).pipe(
      catchError((error) => {
        console.log('NEXT', next);
        return this.handleResponseError(error, request, next);
      })
    );
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
