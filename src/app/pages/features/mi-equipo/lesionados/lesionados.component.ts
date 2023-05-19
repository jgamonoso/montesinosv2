import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { EquiposService } from '../../liga/equipos/equipos.service';
import { LoadingService } from 'src/app/shared/modules/loading.module/service/loading.service';

@Component({
  selector: 'app-lesionados',
  templateUrl: './lesionados.component.html',
  styleUrls: ['./lesionados.component.css']
})
export class LesionadosComponent implements OnInit {

  dataLoaded: boolean;

  managerEnSesion: any;
  listaTemporadas: any[];
  temporadaEnSesion: any

  jugadoresLesionados: any[];

  constructor(
    private authService: AuthService,
    private equiposService: EquiposService,
    private readonly loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.dataLoaded = false;
    this.loadingService.setLoadingState(true);
    this.temporadaEnSesion = this.authService.getStoredTemporada();
    this.managerEnSesion = this.authService.getStoredManager();
    this.listaTemporadas = this.authService.getStoredProximasTemporadas();
    this.loadInitialData();
  }

  loadInitialData() {
    this.equiposService.obtenerJugadoresLesionadosEquipo(this.managerEnSesion.equipo.pkEquipo)
      .subscribe(
        (listadoJugadoresLesionados) => {
          this.jugadoresLesionados = listadoJugadoresLesionados;
          this.dataLoaded = true;
          this.loadingService.setLoadingState(false);
        },
        (error) => {
          console.error('Error en las llamadas', error.message);
        }
      );
  }
}
