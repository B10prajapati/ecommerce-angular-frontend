import { Component, OnInit } from '@angular/core';
import { Product } from '../../products/service/products.service';
import { AdminProductService } from './service/admin-product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(private productService: AdminProductService) {}

  products: Product[] = [];

  _getProducts(): void {
    this.productService.paginateProduct(1, 10).subscribe((data) => {
      this.products = data.data;
      console.log(data);
    });
  }
  ngOnInit(): void {
    this._getProducts();
  }
}
