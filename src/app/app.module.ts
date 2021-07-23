import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
/* Angular Flex Layout */
import { FlexLayoutModule } from '@angular/flex-layout';
/* FormsModule */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
/* Angular Material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/* Routing */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularMaterialModule } from './modules/angular-material/angular-material.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
