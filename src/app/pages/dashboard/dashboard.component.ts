import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { DashboardService } from 'src/app/pages/dashboard/dashboard.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LoadingService } from 'src/app/shared/modules/loading.module/service/loading.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  noticias: any;
  fechas: string[];
  pagina: number = 1;
  liga: number = 1;
  credenciales: any;

  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService,
    private readonly loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData() {
    this.loadingService.setLoadingState(true);
    this.credenciales = this.authService.getStoredCredentials();
    forkJoin([
      this.authService.obtenerTemporadaActual(),
      this.authService.obtenerManagerPorLogin(this.credenciales.manager),
    ]).subscribe(
      ([temporadaActual, managerPorLogin]) => {
        // console.log('Temporada actual:', temporadaActual);
        // console.log('Manager por login:', managerPorLogin);
        this.liga = managerPorLogin.equipo.fkLiga;
        this.cargarNoticias();
      },
      (error) => {
        console.error('Error al obtener la temporada actual o manager por login', error.message);
      }
    );
  }

  cargarNoticias(): void {
    this.dashboardService.obtenerNoticias(this.pagina, this.liga).subscribe(
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