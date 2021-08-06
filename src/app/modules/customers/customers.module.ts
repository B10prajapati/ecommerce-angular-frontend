import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductDetailComponent } from './components/productDetail/product-detail.component';
import { ProductsComponent } from './components/products/products.component';
import { WishlistComponent } from './components/wishlist/wish.component';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';

@NgModule({
  declarations: [
    CustomersComponent,
    CartComponent,
    WishlistComponent,
    ProductsComponent,
    ProductDetailComponent,
    CheckoutComponent,
    ProductCardComponent,
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    MatTableModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatStepperModule,
    ReactiveFormsModule,
    FormsModule,
    DynamicFormModule,
  ],
})
export class CustomersModule {}
