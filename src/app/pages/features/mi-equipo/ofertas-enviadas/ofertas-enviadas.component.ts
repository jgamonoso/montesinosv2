import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { LoadingService } from 'src/app/shared/modules/loading.module/service/loading.service';
import { OfertasEnviadasService } from './ofertas-enviadas.service';

@Component({
  selector: 'app-ofertas-enviadas',
  templateUrl: './ofertas-enviadas.component.html',
  styleUrls: ['./ofertas-enviadas.component.css']
})
export class OfertasEnviadasComponent implements OnInit {

  dataLoaded: boolean;

  managerEnSesion: any;
  listaTemporadas: any[];
  temporadaEnSesion: any;
  ligaGuardadaEnSesion: any;

  listaOfertasRealizadas: any[];

  constructor(
    private authService: AuthService,
    private ofertasEnviadasService: OfertasEnviadasService,
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
      this.ofertasEnviadasService.obtenerListaOfertasRealizadas(this.managerEnSesion.equipo.pkEquipo),
      this.sharedService.obtenerListaEquiposNombre(),
    ]).subscribe(
      ([listaOfertasRealizadas, listaEquiposNombre]) => {
        this.listaOfertasRealizadas = listaOfertasRealizadas;
        this.dataLoaded = true;
        this.loadingService.setLoadingState(false);
      },
      (error) => {
        console.error('Error en ofertas-enviadas', error.message);
        this.loadingService.setLoadingState(false);
      }
    );
  }

  cancel(pkOferta: number) {
    console.log('anularOferta- pkOferta:', pkOferta);
    // anularOferta($manager->pkManager, $manager->equipo->pkEquipo, $_REQUEST['pkOferta']);
    this.verOfertaCancelada();
  }

  verOfertaCancelada(): void {
    this.router.navigate(['/mi-equipo/show-data'], {
      state: {
        titulo: 'Oferta cancelada',
        subtitulo: 'Ya no le aparecerá al otro manager',
        redirectUrl: '/mi-equipo/ofertas-enviadas'
      }
    });
  }
}