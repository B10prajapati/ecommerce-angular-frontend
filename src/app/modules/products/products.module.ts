import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from './../angular-material/angular-material.module';
import { CartComponent } from './components/cart/cart.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';

@NgModule({
  declarations: [ProductsComponent, CartComponent],
  imports: [CommonModule, ProductsRoutingModule, AngularMaterialModule],
})
export class ProductsModule {}
