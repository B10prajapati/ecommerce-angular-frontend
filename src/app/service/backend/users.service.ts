import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BaseService } from '../base.service';

export interface User {
  id: string;
  name: string;
  password: string;
  isActive: boolean;
  createdDateTime: Date;
  updatedDateTime: Date;
}
@Injectable({
  providedIn: 'root',
})
export class UsersService extends BaseService {
  constructor(private http: HttpClient, private cookie: CookieService) {
    super();
  }

  userUrl = `${environment.baseURL}/user`;

  getUser = () => {
    return this.http.get(this.userUrl).pipe(
      retry(2),
      catchError((err) => this.handleError(err, 'getUser'))
    );
  };

  /* GET heroes with pagination */
  paginateUsers(page: number = 1, limit: number = 10): Observable<User[]> {
    const params = new HttpParams();
    params.set('limit', limit);
    params.set('page', page);
    // Add safe, URL encoded search parameter if there is a search term
    const options = page && limit ? { params: params } : {};

    return this.http
      .get<User[]>(this.userUrl, options)
      .pipe(catchError((err) => this.handleError(err, 'searchHeroes', [])));
  }

  /** POST: add a new hero to the database */
  addUser(user: User): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.cookie.get('auth-token')}`,
      }),
    };

    return this.http
      .post<User>(this.userUrl, user, httpOptions)
      .pipe(catchError((err) => this.handleError(err, 'addUser', user)));
  }

  /** DELETE: delete the hero from the server */
  deleteUser(id: number): Observable<unknown> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.cookie.get('auth-token')}`,
      }),
    };

    const url = `${this.userUrl}/${id}`; // DELETE api/heroes/42
    return this.http
      .delete(url, httpOptions)
      .pipe(catchError((err) => this.handleError(err, 'deleteHero', id)));
  }

  /** PUT: update the hero on the server. Returns the updated hero upon success. */
  updateUser(user: User): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.cookie.get('auth-token')}`,
      }),
    };
    return this.http
      .put<User>(this.userUrl, user, httpOptions)
      .pipe(catchError((err) => this.handleError(err, 'updateHero', user)));
  }
}
