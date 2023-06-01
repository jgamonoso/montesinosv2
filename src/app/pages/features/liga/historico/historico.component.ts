import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LoadingService } from 'src/app/shared/modules/loading.module/service/loading.service';
import { SharedService } from 'src/app/services/shared.service';
import { LigaService } from '../liga.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent implements OnInit {

  dataLoaded: boolean;
  ligaGuardadaEnSesion: any;

  listaPalmares: any[];
  listaRecords: any[];

  constructor(
    private authService: AuthService,
    private ligaService: LigaService,
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
      this.ligaService.obtenerPalmaresLiga(this.ligaGuardadaEnSesion.ligaVisible),
      this.ligaService.obtenerRecordsLiga(this.ligaGuardadaEnSesion.ligaVisible),
      this.sharedService.obtenerListaEquiposNombre(),
    ]).subscribe(
      ([palmaresLiga, recordsLiga, listaEquiposNombre]) => {
        // agrupar palmares por temporada
        this.listaPalmares = palmaresLiga.reduce((groupedPalmares, palmares) => {
          const temporadaNombre = palmares.temporada.nombre;
          if (!groupedPalmares[temporadaNombre]) {
            groupedPalmares[temporadaNombre] = [];
          }
          groupedPalmares[temporadaNombre].push(palmares);
          return groupedPalmares;
        }, {});

        this.listaRecords = recordsLiga;
        this.dataLoaded = true;
        this.loadingService.setLoadingState(false);
      },
      (error) => {
        console.error('Error en carga de palmarés historico', error.message);
        this.loadingService.setLoadingState(false);
      }
    );
  }

  objectKeys(obj) {
    if (obj === null || obj === undefined) {
      return [];
    }
    return Object.keys(obj);
  }
}
