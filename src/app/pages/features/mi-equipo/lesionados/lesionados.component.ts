import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LoadingService } from 'src/app/shared/modules/loading.module/service/loading.service';
import { forkJoin } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';
import { LesionadosService } from './lesionados.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lesionados',
  templateUrl: './lesionados.component.html',
  styleUrls: ['./lesionados.component.css']
})
export class LesionadosComponent implements OnInit {

  dataLoaded: boolean;

  managerEnSesion: any;
  listaTemporadas: any[];
  temporadaEnSesion: any
  ligaGuardadaEnSesion: any

  jugadoresLesionados: any[];

  constructor(
    private authService: AuthService,
    private lesionadosService: LesionadosService,
    private readonly loadingService: LoadingService,
    private sharedService: SharedService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.dataLoaded = false;
    this.loadingService.setLoadingState(true);
    this.temporadaEnSesion = this.authService.getStoredTemporada();
    this.managerEnSesion = this.authService.getStoredManager();
    this.listaTemporadas = this.authService.getStoredProximasTemporadas();
    this.ligaGuardadaEnSesion = this.authService.getStoredLigaGuardada();
    this.loadInitialData();
  }

  loadInitialData() {
    forkJoin([
      this.lesionadosService.obtenerJugadoresLesionadosEquipo(this.managerEnSesion.equipo.pkEquipo),
      this.sharedService.obtenerListaEquiposNba(),
    ]).subscribe(
      ([listadoJugadoresLesionados, listaEquiposNba]) => {
        this.jugadoresLesionados = listadoJugadoresLesionados;
        this.dataLoaded = true;
        this.loadingService.setLoadingState(false);
      },
      (error) => {
        console.error('Error en las llamadas', error.message);
        this.loadingService.setLoadingState(false);
      }
    );
  }

  recuperarLLD(pkJugador: number) {
    this.loadingService.setLoadingState(true);
    this.lesionadosService.recuperarJugadorLesionado(
      this.managerEnSesion.pkManager,
      this.managerEnSesion.equipo.pkEquipo,
      pkJugador,
      this.ligaGuardadaEnSesion.ligaVisible
    ).subscribe(
      (response) => {
        this.loadingService.setLoadingState(false);
        if (response.status === 'ok') {
          this.verRecuperarLLDOK();
        }
      },
      (error) => {
        console.error('Error al recuperar jugador LLD', error.message);
        this.loadingService.setLoadingState(false);
      }
    );
  }

  verRecuperarLLDOK(): void {
    this.router.navigate(['/mi-equipo/show-info'], {
      state: {
        titulo: 'Jugador recuperado de LLD',
        subtitulo: 'Puedes ir al menú "Mi equipo" para comprobarlo',
        redirectUrl: '/mi-equipo/lesionados'
      }
    });
  }
}
