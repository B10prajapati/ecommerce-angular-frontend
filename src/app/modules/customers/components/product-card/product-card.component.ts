import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/service/backend/products.service';
import {
  SNACKBAR_BUTTON_TITLE,
  SNACKBAR_OPTIONS,
} from '../../../../service/utils/config';
import { CartService } from '../cart/service/cart.service';
import { WishlistService } from '../wishlist/service/wishlist.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product | null = null;

  inWishlist = false;

  constructor(
    private snack: MatSnackBar,
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {}
  ngOnInit(): void {
    this.inWishlist = this.wishlistService.checkWishlist(this.product?.id!);

    console.log(this.inWishlist);
  }

  // Share
  // Todo
  share() {}

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.snack.open('Item Added', SNACKBAR_BUTTON_TITLE, SNACKBAR_OPTIONS);
  }

  addToWishlist(product: Product) {
    this.wishlistService.addToWishlist(product);
    this.snack.open(
      `Item ${this.inWishlist ? 'Removed' : 'Added'}`,
      SNACKBAR_BUTTON_TITLE,
      SNACKBAR_OPTIONS
    );
    this.inWishlist = !this.inWishlist;
  }
}
