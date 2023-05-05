import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { EquiposService } from './equipos.service';
import { LoadingService } from 'src/app/shared/modules/loading.module/service/loading.service';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {
  ligaGuardadaEnSesion: any;

  dataLoaded: boolean;

  listadoManagersConEquipo: any[];

  constructor(
    private authService: AuthService,
    private equiposService: EquiposService,
    private readonly loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.dataLoaded = false;
    this.loadingService.setLoadingState(true);
    this.loadInitialData();
  }

  loadInitialData() {
    this.ligaGuardadaEnSesion = this.authService.getStoredLigaGuardada();
    this.equiposService.obtenerListadoManagersConEquipo(this.ligaGuardadaEnSesion.ligaVisible)
      .subscribe(
        (listadoManagersConEquipo) => {
          // console.log('listadoManagersConEquipo:', listadoManagersConEquipo);
          this.listadoManagersConEquipo = listadoManagersConEquipo;
          this.dataLoaded = true;
          this.loadingService.setLoadingState(false);
        },
        (error) => {
          console.error('Error en las llamadas', error.message);
        }
      );
  }
}
