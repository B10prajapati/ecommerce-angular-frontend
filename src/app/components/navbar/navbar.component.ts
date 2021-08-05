import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/backend/auth.service';
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

  carts$!: Observable<Cart[]>;

  constructor(
    private auth: AuthService,
    private snack: MatSnackBar,
    private router: Router,
    private cartService: CartService
  ) {}

  async ngOnInit() {
    this.carts$ = this.cartService.items$;
    this.cartService.getItems();
  }

  logout() {
    this.auth.logout().subscribe((data) => {
      this.router.navigateByUrl('/auth/login');
    });
  }
}
