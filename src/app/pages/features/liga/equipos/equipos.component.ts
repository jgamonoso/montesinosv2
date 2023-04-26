import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { EquiposService } from './equipos.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {
  dataLoaded: boolean;

  listadoManagersConEquipo: any[];

  constructor(
    private authService: AuthService,
    private equiposService: EquiposService
  ) { }

  ngOnInit(): void {
    this.dataLoaded = false;
    this.loadInitialData();
  }

  loadInitialData() {
    let ligaGuardada = this.authService.getStoredLigaGuardada();
    forkJoin([
      this.equiposService.obtenerListadoManagersConEquipo(ligaGuardada.ligaVisible),
    ]).subscribe(
      ([listadoManagersConEquipo]) => {
        // console.log('listadoManagersConEquipo:', listadoManagersConEquipo);
        this.listadoManagersConEquipo = listadoManagersConEquipo;
        this.dataLoaded = true;
      },
      (error) => {
        console.error('Error en las llamadas', error.message);
      }
    );
  }

}
