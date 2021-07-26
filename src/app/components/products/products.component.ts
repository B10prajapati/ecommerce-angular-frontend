import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../service/http.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  breakpoint: number = 4;
  products: Array<object> = [
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ];
  constructor(private http: HttpService) {
    this._setBreakPoint(window.innerWidth);
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

  _getProducts(): void {
    this.http.getAllProducts().subscribe((data: any) => {
      this.products = data.data;
    });
  }

  _addItemToCart(id: string, quantity: number): void {
    let payload = {
      productId: id,
      quantity,
    };

    this.http.addToCart(payload).subscribe(() => {
      this._getProducts();
      alert('Product Added');
    });
  }
  ngOnInit(): void {
    this._getProducts();
  }
}
