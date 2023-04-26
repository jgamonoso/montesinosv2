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
    let ligaGuardada = this.authService.getStoredLigaGuardada();
    this.liga = ligaGuardada.ligaVisible;
    this.cargarNoticias();
  }

  cargarNoticias(): void {
    this.noticiasService.obtenerNoticias(this.pagina, this.liga).subscribe(
      (resp) => {
        if (resp) {
          // TODO: si no llegan noticias del ultimo mes, incrementar la paginación
          this.noticias = resp;
          this.fechas = Object.keys(resp);
        }
      },
      (err) => {
        this.loadingService.setLoadingState(false);
        console.warn(err)
      }
    );
  }

  cambiarPagina(incremento: number): void {
    this.pagina += incremento;
    this.cargarNoticias();
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
