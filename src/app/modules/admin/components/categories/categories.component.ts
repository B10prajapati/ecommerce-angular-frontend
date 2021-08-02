import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { FormField } from 'src/app/modules/dynamic-form/form-field';
import { Product } from 'src/app/service/backend/products.service';
import { AdminCategoryService } from './service/admin-category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  displayedColumns: string[];
  dataSource: MatTableDataSource<Product>;
  expandedElement!: Product | null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  formFields: Observable<FormField<any>[]>;

  products: Product[];

  addData(data: Product) {
    console.log(data);
    // this.categoryService.addProduct(data).subscribe((data) => {
    //   console.log(data);
    //   this.products = this.products.concat(data);
    //   this.dataSource.data = this.products;
    // });
  }

  constructor(private categoryService: AdminCategoryService) {
    this.formFields = categoryService.getFormFields();
    this.products = [
      {
        name: 'Default',
        id: '',
        isActive: false,
        createdDateTime: new Date(Date.now()),
        updatedDateTime: new Date(Date.now()),
        price: 0,
        images: [],
      },
    ];

    this.displayedColumns = Object.keys(this.products[0]);

    console.log(this.displayedColumns);
    this.dataSource = new MatTableDataSource<Product>(this.products);
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.displayedColumns,
      event.previousIndex,
      event.currentIndex
    );
  }

  _getProducts(): void {
    // this.productService.paginateProduct(1, 10).subscribe((data) => {
    //   this.products = data.data;
    //   this.dataSource.data.concat(this.products);
    //   console.log(data);
    // });
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
