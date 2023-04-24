import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LangService } from '../modules/lang.module/service/lang.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    public langService: LangService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(event: Event): void {
    event.preventDefault(); // Previene la acción predeterminada del formulario
  }
  onSearchEnter(searchText: string): void {
    console.log('Search text onSearchEnter:', searchText);
    // Aquí puedes utilizar el texto de búsqueda (searchText) para realizar la búsqueda
  }

  onSearchButton(event: MouseEvent, searchText: string): void {
    event.stopPropagation();
    console.log('Search text onSearchButton:', searchText);
    // Aquí puedes utilizar el texto de búsqueda (searchText) para realizar la búsqueda
  }

  toggleSearch(formElement: HTMLElement, searchInput?: HTMLInputElement): void {
    if (searchInput) {
      searchInput.value = '';
    }
    formElement.classList.toggle('visible');
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
