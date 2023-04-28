import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, forkJoin, of } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { EquipoDetalleService } from './equipo-detalle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';

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
  managerEnSesion: any; // Manager logueado
  managerParam: any; // Manager por parametro
  listaTemporadas: any[];

  temporadaEnSesion: any

  private subscription: Subscription;

  constructor(
    private authService: AuthService,
    private equipoDetalleService: EquipoDetalleService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.equipoPropio = true;
    this.ligaPropia = true;

    this.dataLoaded = false;

    this.temporadaEnSesion = this.authService.getStoredTemporada();

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
          console.log('MANAGER:', managerParam.equipo.nombre)
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
      this.equipoDetalleService.obtenerProximasTemporadas(),
    ]).pipe(
      tap(([manager, proximasTemporadas]) => {
        // console.log('Manager:', manager);
        this.man = manager;
        // console.log('Proximas Temporadas:', proximasTemporadas);
        this.listaTemporadas = proximasTemporadas;
        this.dataLoaded = true;
      }),
      tap(
        () => {
        },
        (error) => {
          console.error('Error en las llamadas', error.message);
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

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}