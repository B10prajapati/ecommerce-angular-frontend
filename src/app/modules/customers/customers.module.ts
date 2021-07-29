import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';

@NgModule({
  declarations: [CustomersComponent, CartComponent, ProductsComponent],
  imports: [CommonModule, CustomersRoutingModule, AngularMaterialModule],
})
export class CustomersModule {}
