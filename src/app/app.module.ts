import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/* Cookie */
import { CookieService } from 'ngx-cookie-service';
/* Routing */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminSidenavComponent } from './components/admin-sidenav/admin-sidenav.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AngularMaterialModule } from './modules/angular-material/angular-material.module';

@NgModule({
  declarations: [AppComponent, NavbarComponent, AdminSidenavComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularMaterialModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
