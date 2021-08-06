import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/service/backend/products.service';
import {
  SNACKBAR_BUTTON_TITLE,
  SNACKBAR_OPTIONS,
} from './../../../../service/utils/config';
import { CartService } from './../cart/service/cart.service';
import { CustomersProductService } from './service/customers-products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  breakpoint: number = 4;
  products: Product[] = new Array(4);

  dataSource: MatTableDataSource<Product>;

  constructor(
    private productsService: CustomersProductService,
    private snack: MatSnackBar,
    private cartService: CartService
  ) {
    this._setBreakPoint(window.innerWidth);
    this.dataSource = new MatTableDataSource<Product>(this.products);
  }

  _setBreakPoint(width: number) {
    console.log(width);
    switch (true) {
      case width <= 550:
        this.breakpoint = 1;
        break;
      case width > 550 && width <= 900:
        this.breakpoint = 2;

        break;
      case width > 900 && width <= 1200:
        this.breakpoint = 4;

        break;
      case width > 1200 && width <= 1600:
        this.breakpoint = 5;
        break;

      case width > 1600:
        this.breakpoint = 6;
        break;
    }
  }

  onResize(event: UIEvent) {
    const width = (event.target as Window).innerWidth;

    this._setBreakPoint(width);
    // this.breakpoint = eventWindow.innerWidth <= 400 ? 1 : 6;
  }

  // _addItemToCart(id: string, quantity: number): void {
  //   let payload = {
  //     productId: id,
  //     quantity,
  //   };

  //   this.productsService.addToCart(payload).subscribe(() => {
  //     this._getProducts();
  //     alert('Product Added');
  //   });
  // }

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
