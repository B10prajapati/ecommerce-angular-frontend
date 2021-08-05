import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/service/backend/users.service';
import { BaseService } from 'src/app/service/base.service';
import { environment } from 'src/environments/environment';

export interface LoginBody {
  username: string;
  password: string;
}
export interface RegisterBody {
  username: string;
  password: string;
}

export interface RefreshBody {
  refresh_token: string;
}
export interface AuthenticationPayload {
  user: User;
  payload: {
    type: string;
    token: string;
    refresh_token: string;
  };
}

export interface AuthResult {
  status: string;
  data: AuthenticationPayload;
}

export interface UserDataResult {
  status: string;
  data: any;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  constructor(
    private http: HttpClient,
    private cookie?: CookieService,
    private router?: Router
  ) {
    super();
  }
  authUrl = `${environment.baseURL}/auth`;

  login(body: LoginBody) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .post<AuthResult>(this.authUrl + '/login', body, httpOptions)
      .pipe(catchError((err) => this.handleError(err, 'login')));
  }

  register(body: RegisterBody) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .post<AuthResult>(this.authUrl + '/register', body, httpOptions)
      .pipe(catchError((err) => this.handleError(err, 'login')));
  }

  refresh() {
    const refreshToken = this.cookie?.get('refresh-token');
    if (refreshToken) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      };
      return this.http
        .post<AuthResult>(
          this.authUrl + '/refresh',
          { refresh_token: refreshToken },
          httpOptions
        )
        .pipe(catchError((err) => this.handleError(err, 'refresh')));
    }
    return throwError('Refresh Token not available');
  }

  logout(route: string = '/') {
    const refreshToken = this.cookie?.get('refresh-token');
    if (refreshToken) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      };
      const payload = { refresh_token: refreshToken };

      this.cookie?.deleteAll('/');
      this.router?.navigateByUrl(route);
      return this.http
        .post<AuthResult>(this.authUrl + '/logout', payload, httpOptions)
        .pipe(catchError((err) => this.handleError(err, 'logout')));
    }
    return throwError('Refresh Token not available');
  }

  me() {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.cookie?.get('auth-token')}`,
      }),
    };
    return this.http
      .get<UserDataResult>(this.authUrl + '/me', httpOptions)
      .pipe(catchError((err) => this.handleError(err, 'me')));
  }

  getToken(name: 'auth-token' | 'refresh-token') {
    return this.cookie?.get(name);
  }

  setToken(name: 'auth-token' | 'refresh-token', token: string) {
    this.cookie?.set(
      name,
      token,
      environment.cookieExpiresIn,
      environment.cookiePath
    );
  }

  deleteAllTokens() {
    this.cookie?.deleteAll();
  }

  deleteToken(name: 'auth-token' | 'refresh-token') {
    this.cookie?.delete(name, environment.cookiePath);
  }

  isLoggedIn() {
    return !!(this.getToken('auth-token') || this.getToken('refresh-token'));
  }
}
