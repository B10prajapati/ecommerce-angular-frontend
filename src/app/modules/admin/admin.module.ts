import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
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

    MatPaginatorModule,

    MatFormFieldModule,
    MatInputModule,

    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatTabsModule,
    MatDialogModule,
    MatButtonModule,

    DynamicFormModule,

    DragDropModule,
  ],
})
export class AdminModule {}
