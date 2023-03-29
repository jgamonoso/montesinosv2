import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/pages/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  loading = false;
  noticias: any;
  fechas: string[];
  pagina: number = 1;
  liga: number = 1;

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.loading = false;
    this.cargarNoticias();
  }

  cargarNoticias(): void {
    this.loading = true;
    this.dashboardService.obtenerNoticias(this.pagina, this.liga).subscribe(
      (resp) => {
        if (resp) {
          this.loading = false;
          this.noticias = resp;
          this.fechas = Object.keys(resp);
        }
      },
      (err) => {
        this.loading = false;
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