import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LoadingService } from 'src/app/shared/modules/loading.module/service/loading.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  credenciales: any;

  constructor(
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
      },
      (error) => {
        console.error('Error al obtener la temporada actual o manager por login', error.message);
      }
    );
  }
}