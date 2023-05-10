import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LoadingService } from 'src/app/shared/modules/loading.module/service/loading.service';
import { MercadoService } from '../mercado.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-derechos',
  templateUrl: './derechos.component.html',
  styleUrls: ['./derechos.component.css']
})
export class DerechosComponent implements OnInit {

  dataLoaded: boolean;

  managerEnSesion: any; // Manager logueado
  listaTemporadas: any[];
  temporadaEnSesion: any;
  ligaGuardadaEnSesion: any;

  listaJugadoresConDerecho: any[];

  constructor(
    private authService: AuthService,
    private mercadoService: MercadoService,
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
      this.mercadoService.obtenerListaJugadoresConDerecho(this.ligaGuardadaEnSesion.ligaVisible),
      this.sharedService.obtenerListaEquiposNombre(),
    ]).subscribe(
      ([listaJugadoresConDerecho, listaEquiposNombre]) => {
        this.listaJugadoresConDerecho = listaJugadoresConDerecho;
        this.dataLoaded = true;
        this.loadingService.setLoadingState(false);
      },
      (error) => {
        console.error('Error al obtener la temporada actual o manager por login', error.message);
      }
    );
  }
}
