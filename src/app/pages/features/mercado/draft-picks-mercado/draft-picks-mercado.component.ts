import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LoadingService } from 'src/app/shared/modules/loading.module/service/loading.service';
import { SharedService } from 'src/app/services/shared.service';
import { MercadoService } from '../mercado.service';

@Component({
  selector: 'app-draft-picks-mercado',
  templateUrl: './draft-picks-mercado.component.html',
  styleUrls: ['./draft-picks-mercado.component.css']
})
export class DraftPicksMercadoComponent implements OnInit {

  dataLoaded: boolean;

  managerEnSesion: any; // Manager logueado
  listaTemporadas: any[];
  temporadaEnSesion: any;
  ligaGuardadaEnSesion: any;

  listaDraftpicks: any[];

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
      this.mercadoService.obtenerListaDraftpicks(this.ligaGuardadaEnSesion.ligaVisible),
      this.sharedService.obtenerListaEquiposNombre(),
    ]).subscribe(
      ([listaDraftpicks, listaEquiposNombre]) => {
        this.listaDraftpicks = listaDraftpicks;
        this.dataLoaded = true;
        this.loadingService.setLoadingState(false);
      },
      (error) => {
        console.error('Error al obtener la temporada actual o manager por login', error.message);
      }
    );
  }
}

