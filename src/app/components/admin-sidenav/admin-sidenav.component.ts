import { MediaMatcher } from '@angular/cdk/layout';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-admin-sidenav',
  templateUrl: './admin-sidenav.component.html',
  styleUrls: ['./admin-sidenav.component.scss'],
})
export class AdminSidenavComponent implements OnDestroy, AfterViewInit {
  @ViewChild('snav') sideNav!: MatSidenav;
  mobileQuery: MediaQueryList;

  fillerNav = [
    { name: 'User', route: 'users' },
    { name: 'Product', route: 'products' },
    { name: 'Category', route: 'categories' },
    { name: 'Dashboard', route: 'dashboard' },
  ];
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  keyPressHandler(e: KeyboardEvent) {
    // console.log(e);
    // Tab,Ctrl,aLT and Space toggles tab
    // Escape closes tab if open
    switch (e.key) {
      case 'Escape':
        this.sideNav.opened ? this.sideNav.close() : null;
        break;
      case ' ':
      case 'Control':
      case 'Alt':
        this.sideNav.toggle();

        break;
      default:
    }
  }

  ngAfterViewInit() {
    window.addEventListener('keyup', this.keyPressHandler.bind(this));
    console.log('SideNav', this.sideNav);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
