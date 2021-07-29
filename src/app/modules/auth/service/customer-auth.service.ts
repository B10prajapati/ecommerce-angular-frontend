import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/service/backend/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerAuthService extends AuthService {
  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }
}
