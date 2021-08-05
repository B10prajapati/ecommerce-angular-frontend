import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { CartService } from './service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
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
export class CartComponent implements OnInit {
  items = this.cartService.getItems();

  constructor(private cartService: CartService) {}

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
    this.items = this.cartService.getItems();

    // this.cartService.getCartItems().subscribe((data: any) => {
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
    // this.cartService.increaseQty(payload).subscribe(() => {
    //   this._getCart();
    //   alert('Product Added');
    // });
  }

  emptyCart() {
    this.items = this.cartService.clearCart();
  }

  delete(id: string) {
    this.items = this.cartService.remove(id);
  }
}
