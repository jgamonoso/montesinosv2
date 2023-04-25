import { Component, OnInit } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { EquipoDetalleService } from './equipo-detalle.service';
import { LoadingService } from 'src/app/shared/modules/loading.module/service/loading.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-equipo-detalle',
  templateUrl: './equipo-detalle.component.html',
  styleUrls: ['./equipo-detalle.component.css']
})
export class EquipoDetalleComponent implements OnInit {

  mngr: string;
  ligaPropia: boolean;
  equipoPropio: boolean;

  dataLoaded: boolean;

  man: any;
  manager: any; // Manager logueado
  managerParam: any; // Manager por parametro
  listaTemporadas: any[];

  constructor(
    private authService: AuthService,
    private equipoDetalleService: EquipoDetalleService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.equipoPropio = true;
    this.ligaPropia = true;

    this.dataLoaded = false;
    this.route.queryParamMap.pipe(
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
        this.manager = this.authService.getStoredManager();
        if (managerParam) {
          console.log('MANAGER:', managerParam.equipo.nombre)
          if (this.manager.pkManager === managerParam.pkManager) {
            this.equipoPropio = true;
          } else {
            this.managerParam = managerParam; // Almacenamos el managerParam
            this.man = managerParam; // Almacenamos managerParam en this.man cuando no es equipoPropio
            this.equipoPropio = false;
          }
          if (this.manager.equipo.fkLiga === managerParam.equipo.fkLiga) {
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
      : this.equipoDetalleService.obtenerManager(this.manager.pkManager);

    return forkJoin([
      managerRequest,
      this.equipoDetalleService.obtenerProximasTemporadas(),
    ]).pipe(
      tap(([manager, proximasTemporadas]) => {
        console.log('Manager:', manager);
        this.man = manager;
        console.log('Proximas Temporadas:', proximasTemporadas);
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
}