import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ProductsService } from 'src/app/service/backend/products.service';

@Injectable({
  providedIn: 'root',
})
export class CustomersProductDetailService extends ProductsService {
  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {
    super(httpClient, cookieService);
  }
}
