import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';

@NgModule({
  declarations: [CustomersComponent],
  imports: [CommonModule, CustomersRoutingModule],
})
export class CustomersModule {}
