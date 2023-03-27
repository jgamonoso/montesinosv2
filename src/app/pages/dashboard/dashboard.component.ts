import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { JugadoresPruebaService } from 'src/app/services/jugadores-prueba.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  noticias: any;
  fechas: string[];
  //TODO:
  // pagina: number = 1;
  pagina: number = 50;
  liga: number = 1;

  constructor(
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.cargarNoticias();
  }

  cargarNoticias(): void {
    this.dashboardService.obtenerNoticias(this.pagina, this.liga).subscribe(
      (resp) => {
        if (resp) {
          this.noticias = resp;
          this.fechas = Object.keys(resp);
        }
      },
      (err) => console.warn(err)
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