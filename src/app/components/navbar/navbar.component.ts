import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { WishlistService } from 'src/app/modules/customers/components/wishlist/service/wishlist.service';
import { AuthService } from 'src/app/service/backend/auth.service';
import { Product } from 'src/app/service/backend/products.service';
import { WEBSITE_TITLE } from 'src/app/service/utils/config';
import {
  Cart,
  CartService,
} from './../../modules/customers/components/cart/service/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() isLoggedIn = false;
  title = WEBSITE_TITLE;

  carts$!: Observable<Cart[]>;
  wishlist$!: Observable<Product[]>;

  constructor(
    private auth: AuthService,
    private snack: MatSnackBar,
    private router: Router,
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit() {
    this.carts$ = this.cartService.items$;
    this.wishlist$ = this.wishlistService.items$;
    this.cartService.getItems();
    this.wishlistService.getItems();
  }

  logout() {
    this.auth.logout().subscribe((data) => {
      this.router.navigateByUrl('/auth/login');
    });
  }
}
