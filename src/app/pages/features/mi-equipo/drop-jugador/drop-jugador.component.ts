import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EquipoDetalleService } from '../equipo-detalle/equipo-detalle.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LoadingService } from 'src/app/shared/modules/loading.module/service/loading.service';

@Component({
  selector: 'app-drop-jugador',
  templateUrl: './drop-jugador.component.html',
  styleUrls: ['./drop-jugador.component.css']
})
export class DropJugadorComponent implements OnInit {

  // Añade una propiedad para almacenar la suscripción
  queryParamsSubscription: Subscription;
  managerEnSesion: any;
  pkJugadorliga: any;
  jugadorliga: any;

  dataLoaded: boolean;

  showConfirmation: boolean = true;

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
    });
    this.obtenerJugadorliga();
  }

  obtenerJugadorliga(): void {
    this.loadingService.setLoadingState(true);
    this.equipoDetalleService.obtenerJugadorliga(this.pkJugadorliga).subscribe(
      (resp) => {
        if (resp) {
          this.jugadorliga = resp;
          this.dataLoaded = true;
          this.loadingService.setLoadingState(false);
        }
      },
      (err) => {
        this.loadingService.setLoadingState(false);
        console.warn(err)
      }
    );
  }

  confirm() {
    this.equipoDetalleService.dropJugador(this.managerEnSesion.pkManager,
                                                      this.pkJugadorliga,
                                                      this.managerEnSesion.equipo.pkEquipo,
                                                      true ).subscribe(
        (resp) => {
          this.dataLoaded = true;
          this.loadingService.setLoadingState(false);
          this.showConfirmation = false;
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