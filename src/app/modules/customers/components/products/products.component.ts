import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/service/backend/products.service';
import { CartService } from './../cart/service/cart.service';
import { CustomersProductService } from './service/customers-products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = new Array(4);

  dataSource: MatTableDataSource<Product>;

  constructor(
    private productsService: CustomersProductService,
    private snack: MatSnackBar,
    private cartService: CartService
  ) {
    this.dataSource = new MatTableDataSource<Product>(this.products);
  }

  _getProducts(): void {
    this.productsService.paginateProduct(1, 10).subscribe((data) => {
      this.products = data.data;

      this.dataSource.data = data.data;
      console.log(this.products);
    });
  }
  // Share
  // Todo
  share() {}

  ngOnInit(): void {
    this._getProducts();
  }
}
