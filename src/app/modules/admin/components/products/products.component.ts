import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { FormField } from 'src/app/modules/dynamic-form/form-field';
import { Product } from './../../../../service/backend/products.service';
import { AdminProductService } from './service/admin-product.service';
export function typedKeys<T>(o: T): (keyof T)[] {
  // type cast should be safe because that's what really Object.keys() does
  return Object.keys(o) as (keyof T)[];
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[];
  dataSource: MatTableDataSource<Product>;
  expandedElement!: Product | null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  createFormFields: Observable<FormField<any>[]>;
  updateFormFields: Observable<FormField<any>[]>;

  selectedTab = 0;
  selectedProduct: Product | null = null;
  selectedProductFormValue = {};

  products: Product[];

  constructor(private productService: AdminProductService) {
    this.createFormFields = this.productService.getFormFields();
    this.updateFormFields = this.productService.getFormFields();
    this.products = [
      {
        name: 'Default',
        id: '',
        isActive: false,
        createdDateTime: new Date(Date.now()),
        updatedDateTime: new Date(Date.now()),
        price: 0,
      },
    ];

    this.displayedColumns = ['name', 'price', 'isActive'];

    console.log(this.displayedColumns);
    this.dataSource = new MatTableDataSource<Product>(this.products);
  }

  addData(data: any) {
    console.log(data);
    this.productService.addProduct(data).subscribe((data) => {
      console.log(data);
      this.products = this.products.concat(data);
      this.dataSource.data = this.products;
    });
  }

  updateData(data: any) {
    console.log(data);

    data.id = this.selectedProduct?.id!;
    this.productService.updateProduct(data).subscribe((result) => {
      this.products = this.products.map((product) => {
        console.log(this.selectedProduct?.id);
        console.log(product.id);
        if (product.id === this.selectedProduct?.id!) {
          typedKeys<Product>(data).forEach((key) => {
            product[key] = data[key] as never;
          });
        }
        return product;
      });

      console.log(this.products);

      this.dataSource.data = this.products;
    });
  }

  deleteData = (data: any) => {
    const id = this.selectedProduct?.id;

    this.productService
      .deleteProduct(this.selectedProduct?.id!)
      .subscribe((result) => {
        this.products = this.products.filter((product) => {
          return product.id !== id;
        });

        this.dataSource.data = this.products;
      });

    this.selectedProduct = null;
  };

  tabChangeHandler(tabValue: number) {
    if (tabValue === 0) {
      this.selectedProduct = null;
    }
  }

  rowSelectHandler(product: Product) {
    console.log(product);
    this.selectedTab = 1;
    this.selectedProduct = product;
    this.selectedProductFormValue = {
      name: product.name,
      price: product.price,
      isActive: product.isActive,
    };
    console.log(this.selectedTab);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.displayedColumns,
      event.previousIndex,
      event.currentIndex
    );
  }

  _getProducts(): void {
    this.productService.paginateProduct(1, 10).subscribe((data) => {
      this.products = data.data;
      this.dataSource.data = this.products;
      console.log(data);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this._getProducts();
  }
}
