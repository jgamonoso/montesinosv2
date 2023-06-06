import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { EquiposService } from '../../liga/equipos/equipos.service';
import { LoadingService } from 'src/app/shared/modules/loading.module/service/loading.service';
import { forkJoin } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';

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

  jugadoresLesionados: any[];

  constructor(
    private authService: AuthService,
    private equiposService: EquiposService,
    private readonly loadingService: LoadingService,
    private sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    this.dataLoaded = false;
    this.loadingService.setLoadingState(true);
    this.temporadaEnSesion = this.authService.getStoredTemporada();
    this.managerEnSesion = this.authService.getStoredManager();
    this.listaTemporadas = this.authService.getStoredProximasTemporadas();
    this.loadInitialData();
  }

  loadInitialData() {
    forkJoin([
      this.equiposService.obtenerJugadoresLesionadosEquipo(this.managerEnSesion.equipo.pkEquipo),
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

  navegarRecuperarLLD(pkJugador: number) {
    console.log('pkJugador', pkJugador);


    // recuperarJugadorLesionado($manager->pkManager, $manager->equipo->pkEquipo, $_REQUEST['jugador'],$liga->pkLiga);


    // const queryParams = {
    //   pkDraftpick: pkDraftpick,
    //   recuperarTB: recuperarTB
    // };
    // this.router.navigate(['/mi-equipo/activar-trading-block'], { queryParams });
  }
}
