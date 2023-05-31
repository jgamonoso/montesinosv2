import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LangService } from '../modules/lang.module/service/lang.service';
import { DashboardService } from 'src/app/pages/dashboard/dashboard.service';
import { SharedService } from 'src/app/services/shared.service';
import { LoadingService } from '../modules/loading.module/service/loading.service';
import { Subscription, from } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {

  ligaGuardadaEnSesion: any;

  private subscription: Subscription;
  pkManagerEnSesion: string;
  imagenPerfil = './assets/images/users/null.jpg';

  constructor(
    private authService: AuthService,
    private router: Router,
    public langService: LangService,
    private dashboardService: DashboardService,
    private sharedService: SharedService,
    private readonly loadingService: LoadingService
  ) {
    const storedImagePath = this.authService.getStoredImagenPerfil();
    if (storedImagePath) {
      this.imagenPerfil = storedImagePath; // Usa la ruta de la imagen almacenada si está disponible.
    } else {
      this.asignarImagenPerfil(); // Si no, obtén pkManager para crear la ruta de la imagen.
    }
  }

  ngOnInit(): void {
  }

  asignarImagenPerfil() {
    const pathBase = './assets/images/users/';
    const pkManager$ = this.authService.getStoredPkManager();

    this.subscription = pkManager$.subscribe(
      imagen => {
        if(imagen !== null){
          this.pkManagerEnSesion = imagen;
          this.imagenPerfil = pathBase + imagen + '.jpg';
          this.authService.setImagenPerfilToStore(this.imagenPerfil); // Almacena la ruta de la imagen.
          this.subscription.unsubscribe(); // Desuscribirse una vez que se obtenga el valor.
        }
      },
      error => {
        console.error(error);
      }
    );
  }

  onSubmit(event: Event): void {
    event.preventDefault(); // Previene la acción predeterminada del formulario
  }

  onSearchEnter(searchText: string): void {
    // console.log('Search text onSearchEnter:', searchText);
    if (searchText.length >= 3) {
      this.buscarJugadores(searchText);
    }
  }

  onSearchButton(event: MouseEvent, searchText: string): void {
    event.stopPropagation();
    // console.log('Search text onSearchButton:', searchText);
    if (searchText.length >= 3) {
      this.onSearchEnter(searchText);
    }
  }

  toggleSearch(formElement: HTMLElement, searchInput?: HTMLInputElement): void {
    this.onSidebarLinkClick();
    if (searchInput) {
      searchInput.value = '';
    }
    formElement.classList.toggle('visible');
  }

  buscarJugadores(searchText: string): void {
    this.ligaGuardadaEnSesion = this.authService.getStoredLigaGuardada();
    this.loadingService.setLoadingState(true);
    this.dashboardService.obtenerListaJugadoresBuscadosFUSION(this.ligaGuardadaEnSesion.ligaVisible, searchText).subscribe((data) => {
      this.sharedService.updateSearchResults(data);
    });
    this.router.navigateByUrl('/');
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

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe(); // Limpiar la suscripción.
    }
  }
}
