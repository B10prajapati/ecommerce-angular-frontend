import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/* Cookie */
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
/* Routing */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminSidenavComponent } from './components/admin-sidenav/admin-sidenav.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthInterceptorProvider } from './service/interceptor/auth.interceptor';

@NgModule({
  declarations: [AppComponent, NavbarComponent, AdminSidenavComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: environment.cookieXsrf,
      headerName: environment.headerXsrf,
    }),

    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatSnackBarModule,
  ],
  providers: [CookieService, AuthInterceptorProvider],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
