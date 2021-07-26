import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from './../../service/http.service';
interface Cart {
  name: string;
  image: string;
  price: number;
  quantity: number;
}

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
export class CartComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'image', 'price', 'quantity'];
  carts: Cart[] = [];
  dataSource: MatTableDataSource<Cart>;
  expandedElement!: Cart | null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpService) {
    this.carts = [
      {
        name: 'Dog',
        image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
        price: 100,
        quantity: 24,
      },
      {
        name: 'Cat',
        image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
        price: 1200,
        quantity: 44,
      },
      {
        name: 'Bear',
        image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
        price: 1400,
        quantity: 54,
      },
      {
        name: 'Man',
        image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
        price: 300,
        quantity: 64,
      },
      {
        name: 'Stork',
        image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
        price: 5100,
        quantity: 24,
      },
      {
        name: 'Parrot',
        image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
        price: 6100,
        quantity: 34,
      },
      {
        name: 'Pet',
        image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
        price: 7100,
        quantity: 44,
      },
      {
        name: 'Human',
        image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
        price: 9100,
        quantity: 47,
      },
      {
        name: 'Home',
        image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
        price: 6100,
        quantity: 40,
      },

      {
        name: 'Lion',
        image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
        price: 1800,
        quantity: 42,
      },
      {
        name: 'Tiger',
        image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
        price: 9100,
        quantity: 46,
      },

      {
        name: 'Wolf',
        image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
        price: 9100,
        quantity: 1,
      },
      {
        name: 'Fox',
        image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
        price: 81600,
        quantity: 2,
      },
    ];
    this.dataSource = new MatTableDataSource<Cart>(this.carts);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.carts
      .map((t: any) => t.price * t.quantity)
      .reduce((acc: number, value: number) => acc + value, 0);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this._getCart();
  }

  _getCart(): void {
    this.http.getCartItems().subscribe((data: any) => {
      this.carts = data.data;
      this.dataSource = new MatTableDataSource<Cart>(this.carts);
      this.dataSource.paginator = this.paginator;

      console.log(this.carts);
    });
  }

  _incrementQty(id: string, quantity: number) {
    const payload = {
      product: id,
      quantity,
    };
    this.http.increaseQty(payload).subscribe(() => {
      this._getCart();
      alert('Product Added');
    });
  }

  _emptyCart() {
    this.http.emptyCart().subscribe(() => {
      this._getCart();
      alert('Cart Emptied');
    });
  }
}
