import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'customers',
    loadChildren: () =>
      import('./modules/customers/customers.module').then(
        (m) => m.CustomersModule
      ),
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./modules/orders/orders.module').then((m) => m.OrdersModule),
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
