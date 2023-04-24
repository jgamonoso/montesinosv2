import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SidebarService } from 'src/app/shared/sidebar/services/sidebar.service';

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

  onSidebarLinkClick(): void {
    // Compruebe si el menú está abierto en dispositivos móviles
    if (window.innerWidth < 1170 && document.body.classList.contains('show-sidebar')) {
      // Cierre el menú
      document.body.classList.remove('show-sidebar');

      // Cambie la clase 'ti-close' a 'ti-menu' en el botón del menú
      const menuButton = document.querySelector('.nav-toggler i');
      if (menuButton) {
        menuButton.classList.remove('ti-close');
        menuButton.classList.add('ti-menu');
      }
    }
  }
}
