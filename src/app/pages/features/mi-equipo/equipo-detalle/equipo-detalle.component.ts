import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, forkJoin, of } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { EquipoDetalleService } from './equipo-detalle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { LoadingService } from 'src/app/shared/modules/loading.module/service/loading.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-equipo-detalle',
  templateUrl: './equipo-detalle.component.html',
  styleUrls: ['./equipo-detalle.component.css']
})
export class EquipoDetalleComponent implements OnInit, OnDestroy {

  mngr: string;
  ligaPropia: boolean;
  equipoPropio: boolean;

  dataLoaded: boolean;

  man: any;
  managerEnSesion: any;
  managerParam: any; // Manager por parametro
  listaTemporadas: any[];

  temporadaEnSesion: any

  private subscription: Subscription;

  constructor(
    private authService: AuthService,
    private equipoDetalleService: EquipoDetalleService,
    private route: ActivatedRoute,
    private router: Router,
    private readonly loadingService: LoadingService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.equipoPropio = true;
    this.ligaPropia = true;

    this.dataLoaded = false;

    this.loadingService.setLoadingState(true);
    this.temporadaEnSesion = this.authService.getStoredTemporada();
    this.listaTemporadas = this.authService.getStoredProximasTemporadas();
    this.subscription = this.route.queryParamMap.pipe(
      tap(params => {
        this.mngr = params.get('mngr');
      }),
      switchMap(() => {
        if (this.mngr) {
          // Si this.mngr existe, ejecuta la llamada a obtenerManager(this.mngr)
          return this.equipoDetalleService.obtenerManager(this.mngr);
        } else {
          // Si this.mngr no existe, retorna un observable que emite un valor nulo
          return of(null);
        }
      }),
      tap(managerParam => {
        this.managerEnSesion = this.authService.getStoredManager();
        if (managerParam) {
          // console.log('MANAGER:', managerParam.equipo.nombre)
          if (this.managerEnSesion.pkManager === managerParam.pkManager) {
            this.equipoPropio = true;
            // Guardar Manager en sesion (por si hubo cambios)
            this.authService.setManagerToStore(managerParam);

          } else {
            this.man = managerParam; // Almacenamos managerParam en this.man cuando no es equipoPropio
            this.equipoPropio = false;
          }
          this.managerParam = managerParam; // Almacenamos el managerParam

          if (this.managerEnSesion.equipo.fkLiga === managerParam.equipo.fkLiga) {
            this.ligaPropia = true;
          } else {
            this.ligaPropia = false;
          }
        } else {
          console.log('NO MANAGER')
        }
      }),
      switchMap(() => this.loadInitialData())
    ).subscribe();
  }

  loadInitialData() {
    // Modificamos la primera llamada en el forkJoin para usar managerParamCache si está disponible
    const managerRequest = this.managerParam
      ? of(this.managerParam)
      : this.equipoDetalleService.obtenerManager(this.managerEnSesion.pkManager);

      return forkJoin([
        managerRequest,
        this.sharedService.obtenerListaEquiposNombre(),
        this.sharedService.obtenerListaTemporadas(),
      ]).pipe(
        tap(([manager, listaEquiposNombre, listaTemporadas]) => {
        this.man = manager;
        this.dataLoaded = true;
        this.loadingService.setLoadingState(false);
      }),
      tap(
        () => {
        },
        (error) => {
          console.error('Error en las llamadas', error.message);
          this.loadingService.setLoadingState(false);
        }
      )
    );
  }

  navegarILPagina(pkJugadorliga: number, recuperarIL: number) {
    const queryParams = {
      pkJugadorliga: pkJugadorliga,
      recuperarIL: recuperarIL
    };
    this.router.navigate(['/mi-equipo/activar-il'], { queryParams });
  }

  navegarCOVPagina(pkJugadorliga: number, recuperarCovid: number) {
    const queryParams = {
      pkJugadorliga: pkJugadorliga,
      recuperarCovid: recuperarCovid
    };
    this.router.navigate(['/mi-equipo/activar-covid'], { queryParams });
  }

  navegarTBJugador(pkJugadorliga: number, recuperarTB: number) {
    const queryParams = {
      pkJugadorliga: pkJugadorliga,
      recuperarTB: recuperarTB
    };
    this.router.navigate(['/mi-equipo/activar-trading-block'], { queryParams });
  }

  navegarTBDerecho(pkDerecho: number, recuperarTB: number) {
    const queryParams = {
      pkDerecho: pkDerecho,
      recuperarTB: recuperarTB
    };
    this.router.navigate(['/mi-equipo/activar-trading-block'], { queryParams });
  }

  navegarTBPick(pkDraftpick: number, recuperarTB: number) {
    const queryParams = {
      pkDraftpick: pkDraftpick,
      recuperarTB: recuperarTB
    };
    this.router.navigate(['/mi-equipo/activar-trading-block'], { queryParams });
  }

  navegarDropPagina(pkJugadorliga: number) {
    const queryParams = {
      pkJugadorliga: pkJugadorliga,
    };
    this.router.navigate(['/mi-equipo/drop-jugador'], { queryParams });
  }

  navegarOfertaPagina(pkEquipo: number) {
    const queryParams = {
      pkEquipo: pkEquipo,
    };
    this.router.navigate(['/mi-equipo/realiza-oferta'], { queryParams });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}