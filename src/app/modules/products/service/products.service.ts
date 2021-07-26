import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { BaseService } from 'src/app/service/base.service';

export interface Product {
  id: string;
  name: string;
  price: number;
  isActive: boolean;
  createdDateTime: Date;
  updatedDateTime: Date;
}
export interface PaginatedResult<T> {
  totalCount: number;
  page: number;
  limit: number;
  data: T;
}
@Injectable({
  providedIn: 'root',
})
export class ProductsService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }
  productUrl = `http://localhost:3000/api/products`;

  getProduct = () => {
    return this.http.get(this.productUrl).pipe(
      retry(2),
      catchError((err) => this.handleError(err, 'getproduct'))
    );
  };

  /* GET heroes with pagination */
  paginateProduct(
    page: number = 1,
    limit: number = 10
  ): Observable<PaginatedResult<Product[]>> {
    // Add safe, URL encoded search parameter if there is a search term
    const options =
      page && limit
        ? { params: new HttpParams().set('limit', limit).set('page', page) }
        : {};

    console.log(options);
    return this.http
      .get<PaginatedResult<Product[]>>(this.productUrl, options)
      .pipe(catchError((err) => this.handleError(err, 'searchHeroes', [])));
  }

  /** POST: add a new hero to the database */
  addProduct(product: Product): Observable<Product> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer my-auth-token',
      }),
    };
    return this.http
      .post<Product>(this.productUrl, product, httpOptions)
      .pipe(catchError((err) => this.handleError(err, 'addproduct', product)));
  }

  /** DELETE: delete the hero from the server */
  deleteProduct(id: number): Observable<unknown> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer my-auth-token',
      }),
    };

    const url = `${this.productUrl}/${id}`; // DELETE api/heroes/42
    return this.http
      .delete(url, httpOptions)
      .pipe(catchError((err) => this.handleError(err, 'deleteHero', id)));
  }

  /** PUT: update the hero on the server. Returns the updated hero upon success. */
  updateProduct(product: Product): Observable<Product> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer my-auth-token',
      }),
    };
    return this.http
      .put<Product>(this.productUrl, product, httpOptions)
      .pipe(catchError((err) => this.handleError(err, 'updateHero', product)));
  }
}
