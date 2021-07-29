import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/backend/auth.service';
enum Role {
  user = 'user',
  admin = 'admin',
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private auth: AuthService) {
    this.user = {
      id: '',
      internalComment: false,
      isActive: false,
      isArchived: false,
      name: '',
      password: '',
      roles: [Role.user],
    };
  }
  user: {
    id: string;
    internalComment: boolean;
    isActive: boolean;
    isArchived: boolean;
    name: string;
    password: string;
    roles: Role[];
  };

  ngOnInit(): void {
    this.auth.me().subscribe((data) => {
      if (data.status === 'success') this.user = data.data;

      console.log('User ', this.user);
    });
  }
}
