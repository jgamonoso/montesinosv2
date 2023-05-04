import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EquipoDetalleService } from '../equipo-detalle/equipo-detalle.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ParametrosService } from 'src/app/services/parametros.service';
import { LoadingService } from 'src/app/shared/modules/loading.module/service/loading.service';

@Component({
  selector: 'app-activar-il',
  templateUrl: './activar-il.component.html',
  styleUrls: ['./activar-il.component.css']
})
export class ActivarIlComponent implements OnInit {

  // Añade una propiedad para almacenar la suscripción
  queryParamsSubscription: Subscription;
  managerEnSesion: any;
  pkJugadorliga: any;
  jugadorliga: any;
  recuperarIL: any;
  numeroIL: number;

  case: number;

  exito: boolean;
  dataLoaded: boolean;

  constructor(
    private route: ActivatedRoute,
    private equipoDetalleService: EquipoDetalleService,
    private authService: AuthService,
    private parametrosService: ParametrosService,
    private readonly loadingService: LoadingService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.obtenerValorParametro();

    this.exito = false;
    this.dataLoaded = false;

    this.managerEnSesion = this.authService.getStoredManager();
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      this.pkJugadorliga = +params['pkJugadorliga'];
      this.recuperarIL = +params['recuperarIL'];
    });
  }

  obtenerValorParametro(): void {
    this.parametrosService.obtenerValorParametro("NUMERO_IL").subscribe(
      (resp) => {
        if (resp) {
          this.numeroIL = Number(resp);
          this.obtenerJugadorliga();
        }
      },
      (err) => {
        this.loadingService.setLoadingState(false);
        console.warn(err)
      }
    );
  }

  obtenerJugadorliga(): void {
    this.equipoDetalleService.obtenerJugadorliga(this.pkJugadorliga).subscribe(
      (resp) => {
        if (resp) {
          this.jugadorliga = resp;
          // Llamar a activarIL() después de asignar el valor a this.numeroIL
          this.manejarIL();
        }
      },
      (err) => {
        this.loadingService.setLoadingState(false);
        console.warn(err)
      }
    );
  }

  manejarIL(): void {
    const jugadoresIL = this.managerEnSesion.equipo.jugadoresIL;
    const jugadoresILLength = jugadoresIL ? jugadoresIL.length : 0;

    if (this.recuperarIL === 1) { // Se recupera jugador de la IL

      this.equipoDetalleService.recuperarJugadordeIL(this.managerEnSesion.pkManager,
                                                     this.pkJugadorliga,
                                                     this.managerEnSesion.equipo.fkLiga,
                                                     this.managerEnSesion.equipo.pkEquipo ).subscribe(
        (resp) => {
          this.exito = true;
          this.dataLoaded = true;
          setTimeout(() => {
            this.exito = false;
            this.verMiEquipo();
          }, 3000);
        },
        (err) => {
          this.loadingService.setLoadingState(false);
          console.warn(err)
          }
        );
    } else { // Se activa la IL
      if (!jugadoresIL || jugadoresILLength < this.numeroIL) {
        this.case = 1;

        this.equipoDetalleService.activarILDeJugador(this.managerEnSesion.pkManager,
                                                     this.pkJugadorliga,
                                                     this.managerEnSesion.equipo.fkLiga,
                                                     this.managerEnSesion.equipo.pkEquipo ).subscribe(
          (resp) => {
            this.exito = true;
            this.dataLoaded = true;
            setTimeout(() => {
              this.exito = false;
              this.verMiEquipo();
            }, 3000);
          },
          (err) => {
            this.loadingService.setLoadingState(false);
            console.warn(err)
          }
        );

      } else if (jugadoresILLength === this.numeroIL) {
        this.case = 2;
        this.dataLoaded = true;
        console.log('HAY QUE SUSTITUIR JUGADORES IL')
      } else { // managerEnSesion.equipo.jugadoresIL?.length > numeroIL
        this.case = 3;
        console.log('YA HAY MAS JUGADORES IL de los permitidos')
      }
    }
  }

  verMiEquipo(): void {
    const queryParams = { mngr: this.managerEnSesion.pkManager };
    this.router.navigate(['/mi-equipo/equipo-detalle'], { queryParams });
  }

  sustituirPor(pkJugadorligaRecuperado: any){
    console.log('sustituirPor:', pkJugadorligaRecuperado);


    this.equipoDetalleService.recuperarJugadordeIL(this.managerEnSesion.pkManager,
                                                   pkJugadorligaRecuperado,
                                                   this.managerEnSesion.equipo.fkLiga,
                                                   this.managerEnSesion.equipo.pkEquipo ).subscribe(
      (resp) => {


        this.equipoDetalleService.activarILDeJugador(this.managerEnSesion.pkManager,
                                                     this.pkJugadorliga,
                                                     this.managerEnSesion.equipo.fkLiga,
                                                     this.managerEnSesion.equipo.pkEquipo ).subscribe(
          (resp) => {
            this.exito = true;
            this.dataLoaded = true;
            setTimeout(() => {
              this.exito = false;
              this.verMiEquipo();
            }, 3000);
          },
          (err) => {
            this.loadingService.setLoadingState(false);
            console.warn(err)
          }
        );



      },
      (err) => {
        this.loadingService.setLoadingState(false);
        console.warn(err)
      }
    );


  }

  ngOnDestroy(): void {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }
}
