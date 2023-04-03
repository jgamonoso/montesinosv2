import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  credenciales: any;

  constructor(
    private sidebarService: SidebarService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.menuItems = this.sidebarService.menu;
    this.credenciales = this.authService.getStoredCredentials();
    if (!this.credenciales) {
      this.router.navigate(['/auth/login']);
    }
  }

  logout(){
    this.authService.removeStoredData();
    this.router.navigateByUrl('/');
  }
}
