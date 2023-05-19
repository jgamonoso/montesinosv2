import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LoadingService } from 'src/app/shared/modules/loading.module/service/loading.service';
import { SharedService } from 'src/app/services/shared.service';
import { AgenciaLibreService } from '../agencia-libre.service';

@Component({
  selector: 'app-jugadores-al-season',
  templateUrl: './jugadores-al-season.component.html',
  styleUrls: ['./jugadores-al-season.component.css']
})
export class JugadoresAlSeasonComponent implements OnInit {

  dataLoaded: boolean;

  managerEnSesion: any;
  listaTemporadas: any[];
  temporadaEnSesion: any;
  ligaGuardadaEnSesion: any;

  listaJugadoresLibres: any[];

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
      this.agenciaLibreService.obtenerListaJugadoresLibres(this.ligaGuardadaEnSesion.ligaVisible),
      this.sharedService.obtenerListaEquiposNombre(),
    ]).subscribe(
      ([JugadoresLibres, listaEquiposNombre]) => {
        this.listaJugadoresLibres = JugadoresLibres;
        this.dataLoaded = true;
        this.loadingService.setLoadingState(false);
      },
      (error) => {
        console.error('Error en jugadore-al-season', error.message);
      }
    );
  }
}