import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { BaseService } from 'src/app/service/base.service';
import { environment } from 'src/environments/environment';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  isActive: boolean;
  createdDateTime: Date;
  updatedDateTime: Date;
  images: {
    url: string;
    thumbnailUrl: string;
    name: string;
  }[];
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
  constructor(private http: HttpClient, private cookie: CookieService) {
    super();
  }
  productUrl = `${environment.baseURL}/products`;

  getProduct = () => {
    return this.http.get(this.productUrl).pipe(
      retry(2),
      catchError((err) => this.handleError(err, 'getproduct'))
    );
  };

  /* GET products with pagination */
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
      .pipe(catchError((err) => this.handleError(err, 'paginateProducts', [])));
  }

  /* GET product with ID */
  getProductById(id: string): Observable<Product> {
    return this.http
      .get<Product>(`${this.productUrl}/${id}`)
      .pipe(catchError((err) => this.handleError(err, 'getProductBYId', [])));
  }

  /** POST: add a new hero to the database */
  addProduct(product: Product): Observable<Product> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.cookie.get('auth-token')}`,
      }),
    };
    return this.http
      .post<Product>(this.productUrl, product, httpOptions)
      .pipe(catchError((err) => this.handleError(err, 'addproduct', product)));
  }

  /** DELETE: delete the hero from the server */
  deleteProduct(id: string): Observable<unknown> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.cookie.get('auth-token')}`,
      }),
    };

    const url = `${this.productUrl}/${id}`; // DELETE api/heroes/42
    return this.http
      .delete(url, httpOptions)
      .pipe(catchError((err) => this.handleError(err, 'deleteHero', id)));
  }

  /** PATCH: update the hero on the server. Returns the updated hero upon success. */
  updateProduct(product: Product): Observable<Product> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.cookie.get('auth-token')}`,
      }),
    };
    const url = `${this.productUrl}/${product.id}`; // Update api/heroes/42

    return this.http
      .patch<Product>(url, product, httpOptions)
      .pipe(catchError((err) => this.handleError(err, 'updateHero', product)));
  }
}
