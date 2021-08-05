import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { ProductDetailComponent } from './components/productDetail/product-detail.component';
import { ProductsComponent } from './components/products/products.component';
import { CustomersComponent } from './customers.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('src/app/modules/auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path: 'admin',
    loadChildren: () =>
      import('src/app/modules/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'products/:productId',
    component: ProductDetailComponent,
  },

  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: '',
    // redirectTo: 'products',
    component: CustomersComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersRoutingModule {}
