import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LoadingService } from 'src/app/shared/modules/loading.module/service/loading.service';
import { SharedService } from 'src/app/services/shared.service';
import { MercadoService } from '../mercado.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-draft-picks-mercado',
  templateUrl: './draft-picks-mercado.component.html',
  styleUrls: ['./draft-picks-mercado.component.css']
})
export class DraftPicksMercadoComponent implements OnInit {

  dataLoaded: boolean;

  managerEnSesion: any;
  listaTemporadas: any[];
  temporadaEnSesion: any;
  ligaGuardadaEnSesion: any;

  listaDraftpicks: any[];

  constructor(
    private authService: AuthService,
    private mercadoService: MercadoService,
    private readonly loadingService: LoadingService,
    private sharedService: SharedService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.dataLoaded = false;
    this.temporadaEnSesion = this.authService.getStoredTemporada();
    this.managerEnSesion = this.authService.getStoredManager();
    this.listaTemporadas = this.authService.getStoredProximasTemporadas();
    this.ligaGuardadaEnSesion = this.authService.getStoredLigaGuardada();
    this.loadInitialData();
  }

  loadInitialData() {
    this.loadingService.setLoadingState(true);
    forkJoin([
      this.mercadoService.obtenerListaDraftpicks(this.ligaGuardadaEnSesion.ligaVisible),
      this.sharedService.obtenerListaEquiposNombre(),
    ]).subscribe(
      ([listaDraftpicks, listaEquiposNombre]) => {
        this.listaDraftpicks = listaDraftpicks;
        this.dataLoaded = true;
        this.loadingService.setLoadingState(false);
      },
      (error) => {
        console.error('Error en draft-picks', error.message);
      }
    );
  }

  navegarOfertaPagina(pkEquipo: number) {
    const queryParams = {
      pkEquipo: pkEquipo,
    };
    this.router.navigate(['/mi-equipo/realiza-oferta'], { queryParams });
  }
}

