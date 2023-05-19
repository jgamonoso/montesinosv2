import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { EquiposService } from '../equipos/equipos.service';
import { forkJoin } from 'rxjs';
import { LoadingService } from 'src/app/shared/modules/loading.module/service/loading.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-lesionados-liga',
  templateUrl: './lesionados-liga.component.html',
  styleUrls: ['./lesionados-liga.component.css']
})
export class LesionadosLigaComponent implements OnInit {

  dataLoaded: boolean;

  managerEnSesion: any;
  listaTemporadas: any[];
  temporadaEnSesion: any;
  ligaGuardadaEnSesion: any;

  listaJugadoresLLDConContrato: any[];
  listaJugadoresCOVIDConContrato: any[];
  listaJugadoresILLiga: any[];

  constructor(
    private authService: AuthService,
    private equiposService: EquiposService,
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
      this.equiposService.obtenerJugadoresLLDConContrato(this.ligaGuardadaEnSesion.ligaVisible),
      this.equiposService.obtenerJugadoresCOVIDConContrato(this.ligaGuardadaEnSesion.ligaVisible),
      this.equiposService.obtenerJugadoresILLiga(this.ligaGuardadaEnSesion.ligaVisible),
      this.sharedService.obtenerListaEquiposNombre(),
    ]).subscribe(
      ([jugadoresLLDConContrato, jugadoresCOVIDConContrato, jugadoresILLiga, listaEquiposNombre]) => {
        this.listaJugadoresLLDConContrato = jugadoresLLDConContrato;
        this.listaJugadoresCOVIDConContrato = jugadoresCOVIDConContrato;
        this.listaJugadoresILLiga = jugadoresILLiga;
        this.dataLoaded = true;
        this.loadingService.setLoadingState(false);
      },
      (error) => {
        console.error('Error al obtener la temporada actual o manager por login', error.message);
      }
    );
  }
}
