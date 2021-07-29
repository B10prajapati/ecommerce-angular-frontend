import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminLogInComponent } from './components/log-in/admin-log-in.component';
import { ProductsComponent } from './components/products/products.component';
import { UsersComponent } from './components/users/users.component';
import { AdminAuthGuard } from './guard/admin-auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AdminAuthGuard],
  },
  {
    path: 'login',
    component: AdminLogInComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [AdminAuthGuard],
  },
  { path: 'users', component: UsersComponent, canActivate: [AdminAuthGuard] },
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [AdminAuthGuard],
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
