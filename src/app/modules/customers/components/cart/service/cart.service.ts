import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from 'src/app/service/backend/products.service';

export interface Cart extends Product {
  quantity: number;
}
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _items: Subject<Cart[]> = new Subject<Cart[]>();
  readonly items$ = this._items.asObservable();

  private items: Cart[] = [];

  constructor(private http: HttpClient) {}

  loadAll() {
    this.items = [];
    this._items.next(this.items);
  }
  create(item: Cart) {
    this.items.push(item);
    this._items.next(Object.assign([], this.items));
  }

  update() {
    this._items.next(Object.assign([], this.items));
  }

  remove(id: string) {
    this.items = this.items.filter((item) => item.id !== id);
    this._items.next(Object.assign([], this.items));
    return this.items;
  }

  addToCart(product: Product, quantity: number = 1) {
    let inCart = false;

    this.items = this.items.map((item) => {
      if (item.id === product.id) {
        item.quantity += quantity;
        inCart = true;
      }
      return item;
    });

    if (!inCart) this.items.push({ ...product, quantity });

    this.update();

    localStorage.setItem('cart', JSON.stringify(this.items));

    const cart = localStorage.getItem('cart');
    console.log(cart);
  }

  getItems() {
    if (this.items.length === 0) {
      const cart = localStorage.getItem('cart');
      if (cart) {
        this.items = JSON.parse(cart);
      }
    }
    console.log('ITEM', this.items);
    this.update();
    return this.items;
  }

  clearCart() {
    this.items = [];
    localStorage.setItem('cart', JSON.stringify(this.items));
    this.update();
    return this.items;
  }
}
