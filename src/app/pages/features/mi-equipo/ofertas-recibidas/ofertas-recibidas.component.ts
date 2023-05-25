import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { LoadingService } from 'src/app/shared/modules/loading.module/service/loading.service';
import { OfertasRecibidasService } from './ofertas-recibidas.service';

@Component({
  selector: 'app-ofertas-recibidas',
  templateUrl: './ofertas-recibidas.component.html',
  styleUrls: ['./ofertas-recibidas.component.css']
})
export class OfertasRecibidasComponent implements OnInit {

  dataLoaded: boolean;

  managerEnSesion: any;
  listaTemporadas: any[];
  temporadaEnSesion: any;
  ligaGuardadaEnSesion: any;

  listaOfertasRecibidas: any[];

  constructor(
    private authService: AuthService,
    private ofertasRecibidasService: OfertasRecibidasService,
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
      this.ofertasRecibidasService.obtenerListaOfertasRecibidas(this.managerEnSesion.equipo.pkEquipo),
      this.sharedService.obtenerListaEquiposNombre(),
    ]).subscribe(
      ([listaOfertasRecibidas, listaEquiposNombre]) => {
        this.listaOfertasRecibidas = listaOfertasRecibidas;
        this.dataLoaded = true;
        this.loadingService.setLoadingState(false);
      },
      (error) => {
        console.error('Error en ofertas-enviadas', error.message);
        this.loadingService.setLoadingState(false);
      }
    );
  }

  aceptar(pkOferta: number) {
    console.log('aceptarOferta- pkOferta:', pkOferta);
    this.verOfertaAceptada();
    // aceptarOferta($manager->pkManager, $manager->equipo->pkEquipo, $_REQUEST['pkOferta'],$liga->pkLiga);
  }

  rechazar(pkOferta: number) {
    console.log('rechazarOferta - pkOferta:', pkOferta);
    this.verOfertaRechazada();
    // rechazarOferta($manager->pkManager, $manager->equipo->pkEquipo, $_REQUEST['pkOferta']);
  }

  verOfertaAceptada(): void {
    this.router.navigate(['/mi-equipo/show-info'], {
      state: {
        titulo: 'Oferta aceptada',
        subtitulo: 'Ahora a esperar que la acepte el comisionado',
        redirectUrl: '/mi-equipo/ofertas-recibidas'
      }
    });
  }

  verOfertaRechazada(): void {
    this.router.navigate(['/mi-equipo/show-info'], {
      state: {
        titulo: 'Oferta rechazada',
        subtitulo: 'A esperar que llegue una oferta mejor',
        redirectUrl: '/mi-equipo/ofertas-recibidas'
      }
    });
  }
}