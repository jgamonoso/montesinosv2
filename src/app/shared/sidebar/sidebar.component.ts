import { Component, OnInit } from '@angular/core';
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
  ) {}

  ngOnInit(): void {
    this.menuItems = this.sidebarService.menu;
    console.log(this.menuItems);
    this.credenciales = this.authService.getStoredCredentials();
  }
}
