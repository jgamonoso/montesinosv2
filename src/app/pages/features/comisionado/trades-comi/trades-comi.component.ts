import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { LoadingService } from 'src/app/shared/modules/loading.module/service/loading.service';
import { ComisionadoService } from '../comisionado.service';

@Component({
  selector: 'app-trades-comi',
  templateUrl: './trades-comi.component.html',
  styleUrls: ['./trades-comi.component.css']
})
export class TradesComiComponent implements OnInit {

  dataLoaded: boolean;

  managerEnSesion: any;
  listaTemporadas: any[];
  temporadaEnSesion: any;
  ligaGuardadaEnSesion: any;

  listaTradesPendientes: any[];

  constructor(
    private authService: AuthService,
    private comisionadoService: ComisionadoService,
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
      this.comisionadoService.obtenerListaTradesPendientes(),
      this.sharedService.obtenerListaEquiposNombre(),
      this.sharedService.obtenerListaTemporadas(),
    ]).subscribe(
      ([listaTradesPendientes, listaEquiposNombre, listaTemporadas]) => {
        this.listaTradesPendientes = listaTradesPendientes;
        this.dataLoaded = true;
        this.loadingService.setLoadingState(false);
      },
      (error) => {
        console.error('Error en trades pendientes', error.message);
        this.loadingService.setLoadingState(false);
      }
    );
  }

  validarTrade(pkTrade: number) {
    this.loadingService.setLoadingState(true);
    this.comisionadoService.validarTrade(
      pkTrade,
      this.managerEnSesion.pkManager,
    ).subscribe(
      (response) => {
        this.loadingService.setLoadingState(false);
        if (response.status === 'ok') {
          this.verTradeValidado();
        }
      },
      (error) => {
        console.error('Error al validar trade', error.message);
        this.loadingService.setLoadingState(false);
      }
    );
  }

  vetarTrade(pkTrade: number) {
    this.loadingService.setLoadingState(true);
    this.comisionadoService.vetarTrade(
      pkTrade,
      this.managerEnSesion.pkManager,
    ).subscribe(
      (response) => {
        this.loadingService.setLoadingState(false);
        if (response.status === 'ok') {
          this.verTradeVetado();
        }
      },
      (error) => {
        console.error('Error al vetar trade', error.message);
        this.loadingService.setLoadingState(false);
      }
    );
  }

  verTradeValidado(): void {
    this.router.navigate(['/mi-equipo/show-info'], {
      state: {
        titulo: 'Trade validado',
        subtitulo: 'Trade validado por el comisionado',
        redirectUrl: '/comisionado/trades'
      }
    });
  }

  verTradeVetado(): void {
    this.router.navigate(['/mi-equipo/show-info'], {
      state: {
        titulo: 'Trade vetado',
        subtitulo: 'Trade vetado por el comisionado',
        redirectUrl: '/comisionado/trades'
      }
    });
  }
}