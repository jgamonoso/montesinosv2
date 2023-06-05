import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';
import { RealizaOfertaService } from './realiza-oferta.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LoadingService } from 'src/app/shared/modules/loading.module/service/loading.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-realiza-oferta.component',
  templateUrl: './realiza-oferta.component.html',
  styleUrls: ['./realiza-oferta.component.css']
})
export class RealizaOfertaComponent implements OnInit {

  queryParamsSubscription: Subscription;
  pkEquipo: any;
  dataLoaded: boolean;

  managerEnSesion: any;
  listaTemporadas: any[];

  temporadaEnSesion: any
  equipoPorPk: any;

  listaJugadoresEquipo1: any[] = []
  listaDerechosEquipo1: any[] = []
  listaDraftpicksEquipo1: any[] = []
  listaJugadoresEquipo2: any[] = []
  listaDerechosEquipo2: any[] = []
  listaDraftpicksEquipo2: any[] = []

  constructor(
    private route: ActivatedRoute,
    private realizaOfertaService: RealizaOfertaService,
    private authService: AuthService,
    private readonly loadingService: LoadingService,
    private router: Router,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.dataLoaded = false;

    this.managerEnSesion = this.authService.getStoredManager();
    this.temporadaEnSesion = this.authService.getStoredTemporada();
    this.listaTemporadas = this.authService.getStoredProximasTemporadas();
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      this.pkEquipo = +params['pkEquipo'];
    });
    this.loadInitialData();
  }

  loadInitialData() {
    this.loadingService.setLoadingState(true);
    forkJoin([
      this.realizaOfertaService.obtenerEquipoPorPk(this.pkEquipo),
      this.sharedService.obtenerListaEquiposNombre(),
      this.sharedService.obtenerListaTemporadas(),
      this.sharedService.obtenerListaEquiposNba(),
    ]).subscribe(
      ([equipoPorPk, listaEquiposNombre, listaTemporadas, listaEquiposNba]) => {
        this.equipoPorPk = equipoPorPk;
        this.dataLoaded = true;
        this.loadingService.setLoadingState(false);
      },
      (error) => {
        console.error('Error en realiza-oferta', error.message);
      }
    );
  }

  onCheckChange(event, id: number, lista: any[]) {
    /* Si el checkbox está seleccionado, añadimos el valor a la lista,
    de lo contrario lo eliminamos de la lista. */
    if (event.target.checked) {
      lista.push(id);
    } else {
      const index = lista.indexOf(id);
      if (index !== -1) {
        lista.splice(index, 1);
      }
    }
  }

  isDisabledButtonOferta(): boolean {
    const arraysEquipo1 = [this.listaJugadoresEquipo1, this.listaDerechosEquipo1, this.listaDraftpicksEquipo1];
    const arraysEquipo2 = [this.listaJugadoresEquipo2, this.listaDerechosEquipo2, this.listaDraftpicksEquipo2];

    const algunArrayEquipo1NoEstaVacio = arraysEquipo1.some(array => array.length > 0);
    const algunArrayEquipo2NoEstaVacio = arraysEquipo2.some(array => array.length > 0);

    return !(algunArrayEquipo1NoEstaVacio && algunArrayEquipo2NoEstaVacio);
  }

  crearOferta(): void {
    this.loadingService.setLoadingState(true);
    this.realizaOfertaService.crearOferta(
      this.managerEnSesion.pkManager,
      this.managerEnSesion.equipo.pkEquipo,
      this.listaJugadoresEquipo1,
      this.listaDerechosEquipo1,
      this.listaDraftpicksEquipo1,
      this.pkEquipo,
      this.listaJugadoresEquipo2,
      this.listaDerechosEquipo2,
      this.listaDraftpicksEquipo2,
    ).subscribe(
      (response) => {
        // this.loading = false;
        this.loadingService.setLoadingState(false);
        if (response.status === 'ok') {
          this.navegarOfertaRealizada()
        }
      },
      (error) => {
        // this.loading = false;
        console.error('Error de creación de oferta', error.message);
        this.loadingService.setLoadingState(false);
      }
    );
  }

  navegarOfertaRealizada() {
    this.router.navigate(['/mi-equipo/show-info'], {
      state: {
        titulo: 'Oferta realizada',
        subtitulo: 'Ahora espera que el otro manager la acepte',
        redirectUrl: '/mi-equipo/ofertas-enviadas'
      }
    });
  }

  ngOnDestroy(): void {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }
}
