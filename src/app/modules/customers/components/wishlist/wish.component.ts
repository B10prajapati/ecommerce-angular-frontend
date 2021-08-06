import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { WishlistService } from './service/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wish.component.html',
  styleUrls: ['./wishlist.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class WishlistComponent implements OnInit {
  items = this.wishlistService.getItems();

  constructor(private wishlistService: WishlistService) {}

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.items
      .map((t: any) => t.price * t.quantity)
      .reduce((acc: number, value: number) => acc + value, 0);
  }

  ngOnInit(): void {
    this.getCart();
  }

  getCart(): void {
    this.items = this.wishlistService.getItems();

    // this.wishlistService.getCartItems().subscribe((data: any) => {
    //   this.carts = data.data;
    //   this.dataSource = new MatTableDataSource<Cart>(this.carts);
    //   this.dataSource.paginator = this.paginator;
    //   console.log(this.carts);
    // });
  }

  incrementQty(id: string, quantity: number) {
    const payload = {
      product: id,
      quantity,
    };
    // this.wishlistService.increaseQty(payload).subscribe(() => {
    //   this._getCart();
    //   alert('Product Added');
    // });
  }

  emptyCart() {
    this.items = this.wishlistService.clearWishlist();
  }

  delete(id: string) {
    this.items = this.wishlistService.remove(id);
  }
}
