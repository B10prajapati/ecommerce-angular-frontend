import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/backend/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() isLoggedIn = false;
  constructor(
    private auth: AuthService,
    private snack: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  logout() {
    this.auth.logout().subscribe((data) => {
      this.router.navigateByUrl('/auth/login');
    });
  }
}
