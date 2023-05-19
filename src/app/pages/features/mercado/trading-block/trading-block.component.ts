import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LoadingService } from 'src/app/shared/modules/loading.module/service/loading.service';
import { SharedService } from 'src/app/services/shared.service';
import { MercadoService } from '../mercado.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trading-block',
  templateUrl: './trading-block.component.html',
  styleUrls: ['./trading-block.component.css']
})
export class TradingBlockComponent implements OnInit {

  dataLoaded: boolean;

  managerEnSesion: any;
  listaTemporadas: any[];
  temporadaEnSesion: any;
  ligaGuardadaEnSesion: any;

  listaDraftpicks: any[];
  listaJugadoresConContrato: any[];
  listaJugadoresConDerecho: any[];

  constructor(
    private authService: AuthService,
    private mercadoService: MercadoService,
    private readonly loadingService: LoadingService,
    private sharedService: SharedService,
    private router: Router,
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
      this.mercadoService.obtenerListaDraftpicksTradingBlock(this.ligaGuardadaEnSesion.ligaVisible),
      this.mercadoService.obtenerListaJugadoresConContratoTradingBlock(this.ligaGuardadaEnSesion.ligaVisible),
      this.mercadoService.obtenerListaJugadoresConDerechoTradingBlock(this.ligaGuardadaEnSesion.ligaVisible),
      this.sharedService.obtenerListaEquiposNombre(),
    ]).subscribe(
      ([listaDraftpicks, listaJugadoresConContrato, listaJugadoresConDerecho, listaEquiposNombre]) => {
        this.listaDraftpicks = listaDraftpicks;
        this.listaJugadoresConContrato = listaJugadoresConContrato;
        this.listaJugadoresConDerecho = listaJugadoresConDerecho;
        this.dataLoaded = true;
        this.loadingService.setLoadingState(false);
      },
      (error) => {
        console.error('Error en trading-block', error.message);
      }
    );
  }

  navegarOfertaPagina(pkEquipo: number) {
    const queryParams = {
      pkEquipo: pkEquipo,
    };
    this.router.navigate(['/mi-equipo/realiza-oferta'], { queryParams });
  }
}
