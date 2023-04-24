import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { EquipoDetalleService } from './equipo-detalle.service';
import { LoadingService } from 'src/app/shared/modules/loading.module/service/loading.service';

@Component({
  selector: 'app-equipo-detalle',
  templateUrl: './equipo-detalle.component.html',
  styleUrls: ['./equipo-detalle.component.css']
})
export class EquipoDetalleComponent implements OnInit {

  dataLoaded: boolean;

  manager: any;
  man: any;
  listaTemporadas: any[];

  constructor(
    private authService: AuthService,
    private equipoDetalleService: EquipoDetalleService,
    private readonly loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.dataLoaded = false;
    this.loadInitialData();
  }

  loadInitialData() {
    this.manager = this.authService.getStoredManager();
    // console.log(this.manager);
    forkJoin([
      this.equipoDetalleService.obtenerManager(this.manager.pkManager),
      this.equipoDetalleService.obtenerProximasTemporadas(),
    ]).subscribe(
      ([manager, proximasTemporadas]) => {
        console.log('Manager:', manager);
        this.man = manager;
        console.log('Proximas Temporadas:', proximasTemporadas);
        this.listaTemporadas = proximasTemporadas;
        this.dataLoaded = true;
      },
      (error) => {
        console.error('Error en las llamadas', error.message);
      }
    );
  }

}
