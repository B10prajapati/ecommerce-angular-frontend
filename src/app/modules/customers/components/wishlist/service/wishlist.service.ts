import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from 'src/app/service/backend/products.service';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private _items: Subject<Product[]> = new Subject<Product[]>();
  readonly items$ = this._items.asObservable();

  private items: Product[] = [];

  constructor(private http: HttpClient) {
    if (this.items.length === 0) {
      const wishlist = localStorage.getItem('wishlist');
      if (wishlist) {
        this.items = JSON.parse(wishlist);
      }
    }
    console.log('ITEM', this.items);
    this.update();

    console.log(this.items);
  }

  loadAll() {
    this.items = [];
    this._items.next(this.items);
  }
  create(item: Product) {
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

  addToWishlist(product: Product, quantity: number = 1) {
    let inWishlist = false;

    this.items = this.items.map((item) => {
      if (item.id === product.id) {
        inWishlist = true;
      }
      return item;
    });

    if (!inWishlist) {
      this.items.push(product);

      this.update();
    } else {
      this.remove(product.id);
    }

    localStorage.setItem('wishlist', JSON.stringify(this.items));

    const wishlist = localStorage.getItem('wishlist');
    console.log(wishlist);
  }

  getItems() {
    if (this.items.length === 0) {
      const wishlist = localStorage.getItem('wishlist');
      if (wishlist) {
        this.items = JSON.parse(wishlist);
      }
    }
    console.log('ITEM', this.items);
    this.update();
    return this.items;
  }

  clearWishlist() {
    this.items = [];
    localStorage.setItem('wishlist', JSON.stringify(this.items));
    this.update();
    return this.items;
  }

  checkWishlist(id: string) {
    let inWishlist = false;
    this.items.map((item) => {
      if (item.id === id) inWishlist = true;
    });
    return inWishlist;
  }
}
