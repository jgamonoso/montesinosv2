import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LoadingService } from 'src/app/shared/modules/loading.module/service/loading.service';
import { SharedService } from 'src/app/services/shared.service';
import { LigaService } from '../liga.service';
import { ParametrosService } from 'src/app/services/parametros.service';

@Component({
  selector: 'app-apuestas-liga',
  templateUrl: './apuestas-liga.component.html',
  styleUrls: ['./apuestas-liga.component.css']
})
export class ApuestasLigaComponent implements OnInit {

  dataLoaded: boolean;
  ligaGuardadaEnSesion: any;
  apuestasAbiertas: any[];
  listaEquiposLiga: any[];

  constructor(
    private authService: AuthService,
    private ligaService: LigaService,
    private parametrosService: ParametrosService,
    private readonly loadingService: LoadingService,
    private sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    this.dataLoaded = false;
    this.ligaGuardadaEnSesion = this.authService.getStoredLigaGuardada();
    this.loadInitialData();
  }

  loadInitialData() {
    this.loadingService.setLoadingState(true);
    forkJoin([
      this.parametrosService.obtenerValorParametro("APUESTAS_ABIERTAS"),
      this.ligaService.obtenerListaEquiposLigaApuestas(this.ligaGuardadaEnSesion.ligaVisible),
      this.sharedService.obtenerListaEquiposNombre(),
    ]).subscribe(
      ([valorParametroApuestasAbiertas, obtenerListaEquiposLigaApuestas, listaEquiposNombre]) => {
        this.apuestasAbiertas = valorParametroApuestasAbiertas;
        this.listaEquiposLiga = obtenerListaEquiposLigaApuestas;
        this.dataLoaded = true;
        this.loadingService.setLoadingState(false);
      },
      (error) => {
        console.error('Error en carga de palmarés historico', error.message);
        this.loadingService.setLoadingState(false);
      }
    );
  }
}
