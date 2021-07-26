import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';
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
  refreshToken: string;
}
export interface AuthenticationPayload {
  user: User;
  payload: {
    type: string;
    token: string;
    refreshToken: string;
  };
}
export interface AuthResult {
  status: string;
  data: AuthenticationPayload;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  constructor(private http: HttpClient) {
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

  refresh(body: RefreshBody) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .post<AuthResult>(this.authUrl + '/refresh', body, httpOptions)
      .pipe(catchError((err) => this.handleError(err, 'login')));
  }

  me() {
    return this.http.get<AuthResult>(this.authUrl + '/me').pipe(
      retry(2),
      catchError((err) => this.handleError(err, 'me'))
    );
  }
}
