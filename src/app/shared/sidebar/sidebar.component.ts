import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SidebarService } from 'src/app/shared/sidebar/services/sidebar.service';
import { xorEncryptDecrypt } from '../functions/xor-encryption/xor-encryption.component';
import { environment } from 'src/environments/environment';

const SECRET_KEY = environment.SECRET_KEY;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  credencialesEnSesion: any;
  managerEnSesion: any;
  ligaGuardadaEnSesion: {
    ligaVisible: number;
    ligaPropia: boolean;
  } = {
    ligaVisible: 1,
    ligaPropia: true
  };

  constructor(
    private sidebarService: SidebarService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.menuItems = this.sidebarService.menu;
    this.ligaGuardadaEnSesion = this.authService.getStoredLigaGuardada() || this.ligaGuardadaEnSesion;
    this.credencialesEnSesion = this.authService.getStoredCredentials();
    if (!this.credencialesEnSesion) {
      this.router.navigate(['/auth/login']);
    }
    // Nos suscribimos al observable que nos dará el manager cuando esté listo
    this.authService.obtenerManagerPorLogin(this.credencialesEnSesion.manager).subscribe(manager => {
      this.managerEnSesion = manager;
    });
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

  verMiEquipo(): void {
    this.onSidebarLinkClick();
    const queryParams = { mngr: this.managerEnSesion.pkManager };
    this.router.navigate(['/mi-equipo/equipo-detalle'], { queryParams });
  }

  cambiarDeLiga(): void {
    this.onSidebarLinkClick();

    this.ligaGuardadaEnSesion = this.authService.getStoredLigaGuardada();
    this.ligaGuardadaEnSesion.ligaPropia = !this.ligaGuardadaEnSesion.ligaPropia;
    if (this.ligaGuardadaEnSesion.ligaVisible === 1) {
      this.ligaGuardadaEnSesion.ligaVisible = 2;
    } else {
      this.ligaGuardadaEnSesion.ligaVisible = 1;
    }
    this.setligaVisible();

    const queryParams = { liga: this.ligaGuardadaEnSesion.ligaVisible };
    this.router.navigate(['/liga/cambiar-liga'], { queryParams });
  }

  setligaVisible(){
    const encryptedData = xorEncryptDecrypt(JSON.stringify(this.ligaGuardadaEnSesion), SECRET_KEY);
    const remember = this.authService.getRemember();
    if (remember) {
      localStorage.setItem('ligaGuardada', encryptedData);
    } else {
      sessionStorage.setItem('ligaGuardada', encryptedData);
    }
  }
}
