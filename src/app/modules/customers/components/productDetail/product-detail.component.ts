import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/service/backend/products.service';
import { CartService } from '../cart/service/cart.service';
import { CustomersProductService } from '../products/service/customers-products.service';
import {
  SNACKBAR_BUTTON_TITLE,
  SNACKBAR_OPTIONS,
} from './../../../../service/utils/config';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  quantity: number = 1;

  constructor(
    private productService: CustomersProductService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private snack: MatSnackBar
  ) {}
  ngOnInit(): void {
    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = routeParams.get('productId');

    // Find the product that correspond with the id provided in route.
    this.productService
      .getProductById(productIdFromRoute!)
      .subscribe((data) => {
        this.product = data;
      });
  }

  addToCart(product: Product) {
    console.log(this.quantity);
    this.cartService.addToCart(product, this.quantity);
    this.snack.open('Item Added', SNACKBAR_BUTTON_TITLE, SNACKBAR_OPTIONS);
  }

  incrementQuantity() {
    this.quantity += 1;
  }

  decrementQuantity() {
    if (this.quantity > 0) this.quantity -= 1;
  }

  setQuantity(qty: number) {
    this.quantity = qty;
  }
}
