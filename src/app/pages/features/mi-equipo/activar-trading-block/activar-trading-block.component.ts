import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EquipoDetalleService } from '../equipo-detalle/equipo-detalle.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LoadingService } from 'src/app/shared/modules/loading.module/service/loading.service';
import { Console } from 'console';

@Component({
  selector: 'app-activar-trading-block',
  templateUrl: './activar-trading-block.component.html',
  styleUrls: ['./activar-trading-block.component.css']
})
export class ActivarTradingBlockComponent implements OnInit {

  // Añade una propiedad para almacenar la suscripción
  queryParamsSubscription: Subscription;
  managerEnSesion: any;

  pkJugadorliga: any;
  pkDerecho: any;
  pkDraftpick: any;

  jugadorliga: any;
  recuperarTB: any;

  dataLoaded: boolean;

  constructor(
    private route: ActivatedRoute,
    private equipoDetalleService: EquipoDetalleService,
    private authService: AuthService,
    private readonly loadingService: LoadingService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.dataLoaded = false;

    this.managerEnSesion = this.authService.getStoredManager();
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      this.pkJugadorliga = +params['pkJugadorliga'];
      this.pkDerecho = +params['pkDerecho'];
      this.pkDraftpick = +params['pkDraftpick'];
      this.recuperarTB = +params['recuperarTB'];
    });
    if (this.pkJugadorliga) {
      this.obtenerJugadorliga('Jugador');
    }
    if (this.pkDerecho) {
      this.obtenerJugadorliga('Derecho');
    }
    if (this.pkDraftpick) {
      this.manejarTB();
    }
  }

  obtenerJugadorliga(tipo: string): void {
    let type;
    if (tipo === 'Jugador') {
      type = this.pkJugadorliga;
    } else if (tipo === 'Derecho') {
      type = this.pkDerecho;
    } else {
      this.manejarTB();
    }
    this.equipoDetalleService.obtenerJugadorliga(type).subscribe(
      (resp) => {
        if (resp) {
          this.jugadorliga = resp;
          // Llamar a activarTB() después de asignar el valor a this.jugadorliga
          this.manejarTB();
        }
      },
      (err) => {
        this.loadingService.setLoadingState(false);
        console.warn(err)
      }
    );
  }

  manejarTB(): void {
    let paramValue = this.pkJugadorliga ? {type: 'pkJugadorliga', value: this.pkJugadorliga} :
                   this.pkDerecho ? {type: 'pkDerecho', value: this.pkDerecho} :
                   this.pkDraftpick ? {type: 'pkDraftpick', value: this.pkDraftpick} :
                   null;

    if (this.recuperarTB === 0) { // Se recupera jugador de la TB

      this.equipoDetalleService.recuperarDeTradingBlock(this.managerEnSesion.pkManager,
                                                     this.managerEnSesion.equipo.pkEquipo,
                                                     this.pkJugadorliga,
                                                     this.pkDerecho,
                                                     this.pkDraftpick ).subscribe(
        (resp) => {
          this.dataLoaded = true;
          setTimeout(() => {
            this.verMiEquipo();
          }, 3000);
        },
        (err) => {
          this.loadingService.setLoadingState(false);
          console.warn(err)
          }
        );
    } else { // Se activa la TB
      this.equipoDetalleService.addTradingBlock(this.managerEnSesion.pkManager,
                                                    this.managerEnSesion.equipo.pkEquipo,
                                                    this.pkJugadorliga,
                                                    this.pkDerecho,
                                                    this.pkDraftpick ).subscribe(
        (resp) => {
          this.dataLoaded = true;
          setTimeout(() => {
            this.verMiEquipo();
          }, 3000);
        },
        (err) => {
          this.loadingService.setLoadingState(false);
          console.warn(err)
        }
      );
    }
  }

  verMiEquipo(): void {
    const queryParams = { mngr: this.managerEnSesion.pkManager };
    this.router.navigate(['/mi-equipo/equipo-detalle'], { queryParams });
  }

  ngOnDestroy(): void {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }
}