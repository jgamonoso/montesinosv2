import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LoadingService } from 'src/app/shared/modules/loading.module/service/loading.service';
import { SharedService } from 'src/app/services/shared.service';
import { AgenciaLibreService } from '../agencia-libre.service';

@Component({
  selector: 'app-jugadores-al-offseason',
  templateUrl: './jugadores-al-offseason.component.html',
  styleUrls: ['./jugadores-al-offseason.component.css']
})
export class JugadoresAlOffseasonComponent implements OnInit {

  dataLoaded: boolean;

  managerEnSesion: any;
  listaTemporadas: any[];
  temporadaEnSesion: any;
  ligaGuardadaEnSesion: any;

  listaJugadoresLibresOffseason: any[];

  constructor(
    private authService: AuthService,
    private agenciaLibreService: AgenciaLibreService,
    private readonly loadingService: LoadingService,
    private sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    this.dataLoaded = false;
    this.temporadaEnSesion = this.authService.getStoredTemporada();
    this.managerEnSesion = this.authService.getStoredManager();
    this.listaTemporadas = this.authService.getStoredProximasTemporadas();
    this.ligaGuardadaEnSesion = this.authService.getStoredLigaGuardada();
    this.loadInitialData();
  }

  loadInitialData() {
    this.loadingService.setLoadingState(true);
    forkJoin([
      this.agenciaLibreService.obtenerListaJugadoresLibresOffseason(this.ligaGuardadaEnSesion.ligaVisible, this.managerEnSesion.equipo.pkEquipo),
      this.sharedService.obtenerListaEquiposNombre(),
    ]).subscribe(
      ([JugadoresLibresOffseason, listaEquiposNombre]) => {
        this.listaJugadoresLibresOffseason = JugadoresLibresOffseason;
        this.dataLoaded = true;
        this.loadingService.setLoadingState(false);
      },
      (error) => {
        console.error('Error al obtener la temporada actual o manager por login', error.message);
      }
    );
  }
}