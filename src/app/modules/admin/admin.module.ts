import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';
import { AdminRoutingModule } from './admin-routing.module';
import { CategoriesComponent } from './components/categories/categories.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { AdminLogInComponent } from './components/log-in/admin-log-in.component';
import { ProductsComponent } from './components/products/products.component';
import { UsersComponent } from './components/users/users.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProductsComponent,
    UsersComponent,
    CategoriesComponent,
    AdminLogInComponent,
    DialogComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AngularMaterialModule,

    DynamicFormModule,
    DragDropModule,
  ],
})
export class AdminModule {}
