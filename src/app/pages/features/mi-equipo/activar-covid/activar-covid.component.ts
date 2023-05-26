import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EquipoDetalleService } from '../equipo-detalle/equipo-detalle.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LoadingService } from 'src/app/shared/modules/loading.module/service/loading.service';

@Component({
  selector: 'app-activar-covid',
  templateUrl: './activar-covid.component.html',
  styleUrls: ['./activar-covid.component.css']
})
export class ActivarCovidComponent implements OnInit {

  // Añade una propiedad para almacenar la suscripción
  queryParamsSubscription: Subscription;
  managerEnSesion: any;
  pkJugadorliga: any;
  jugadorliga: any;
  recuperarCovid: any;
  numeroCovid: number;

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
    this.loadingService.setLoadingState(true);

    this.managerEnSesion = this.authService.getStoredManager();
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      this.pkJugadorliga = +params['pkJugadorliga'];
      this.recuperarCovid = +params['recuperarCovid'];
    });
    this.obtenerJugadorliga();
  }

  obtenerJugadorliga(): void {
    this.equipoDetalleService.obtenerJugadorliga(this.pkJugadorliga).subscribe(
      (resp) => {
        if (resp) {
          this.jugadorliga = resp;
          // Llamar a activarCovid() después de asignar el valor a this.numeroCovid
          this.manejarCovid();
        }
      },
      (err) => {
        this.loadingService.setLoadingState(false);
        console.warn(err)
      }
    );
  }

  manejarCovid(): void {
    if (this.recuperarCovid === 0) { // Se recupera jugador de la Covid

      this.equipoDetalleService.recuperarJugadordeCovid(this.managerEnSesion.pkManager,
                                                     this.pkJugadorliga,
                                                     this.managerEnSesion.equipo.fkLiga,
                                                     this.managerEnSesion.equipo.pkEquipo ).subscribe(
        (resp) => {
          this.dataLoaded = true;
          this.loadingService.setLoadingState(false);
          setTimeout(() => {
            this.verMiEquipo();
          }, 3000);
        },
        (err) => {
          this.loadingService.setLoadingState(false);
          console.warn(err)
          }
        );
    } else { // Se activa la Covid
      this.equipoDetalleService.activarCovidDeJugador(this.managerEnSesion.pkManager,
                                                    this.pkJugadorliga,
                                                    this.managerEnSesion.equipo.fkLiga,
                                                    this.managerEnSesion.equipo.pkEquipo ).subscribe(
        (resp) => {
          this.dataLoaded = true;
          this.loadingService.setLoadingState(false);
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