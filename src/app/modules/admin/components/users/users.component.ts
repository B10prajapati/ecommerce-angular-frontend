import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/service/backend/users.service';
import { AdminUserService } from './service/admin-user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  title = 'AngularDynamicForms';
  displayedColumns: string[];
  dataSource: MatTableDataSource<User>;
  expandedElement!: User | null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  users: User[];

  constructor(private userService: AdminUserService) {
    this.users = [
      {
        name: 'Default',
        id: '',
        isActive: false,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        password: 'asdfsf',
      },
      {
        name: 'Default',
        id: '',
        isActive: false,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        password: 'asdfsf',
      },
      {
        name: 'Default',
        id: '',
        isActive: false,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        password: 'asdfsf',
      },
      {
        name: 'Default',
        id: '',
        isActive: false,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        password: 'asdfsf',
      },
      {
        name: 'Default',
        id: '',
        isActive: false,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        password: 'asdfsf',
      },
      {
        name: 'Default',
        id: '',
        isActive: false,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        password: 'asdfsf',
      },
    ];

    this.displayedColumns = Object.keys(this.users[0]);

    console.log(this.displayedColumns);
    this.dataSource = new MatTableDataSource<User>(this.users);
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.displayedColumns,
      event.previousIndex,
      event.currentIndex
    );
  }

  _getProducts(): void {
    this.userService.paginateUsers(1, 10).subscribe((data) => {
      this.users = data;
      this.dataSource.data = this.users;
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

  addData(data: any) {}
}
