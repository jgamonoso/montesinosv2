import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LoadingService } from 'src/app/shared/modules/loading.module/service/loading.service';
import { NoticiasService } from './noticias.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {
  ligaGuardadaEnSesion: any;

  noticias: any;
  fechas: string[];
  pagina: number = 1;
  liga: number;

  constructor(
    private noticiasService: NoticiasService,
    private authService: AuthService,
    private readonly loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.ligaGuardadaEnSesion = this.authService.getStoredLigaGuardada();
    this.liga = this.ligaGuardadaEnSesion.ligaVisible;
    this.cargarNoticias();
  }

  cargarNoticias(): void {
    this.loadingService.setLoadingState(true);
    this.noticiasService.obtenerNoticias(this.pagina, this.liga).subscribe(
      (resp) => {
        if (resp) {
          this.noticias = resp;
          this.fechas = Object.keys(resp);
          this.loadingService.setLoadingState(false);
          if (this.noticias.length === 0) {
            setTimeout(() => {
              this.cambiarPagina(1);
            }, 1);
          }
        }
      },
      (err) => {
        this.loadingService.setLoadingState(false);
        console.warn(err)
      }
    );
  }

  cambiarPagina(incremento: number): void {
    if (this.pagina === 1 && incremento === -1) {
      // En este caso no hay cambio de pagina
    } else {
      this.pagina += incremento;
      this.cargarNoticias();
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  isNotEmpty(obj: any): boolean {
    return obj && Object.keys(obj).length > 0;
  }
}
