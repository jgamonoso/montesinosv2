import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-busqueda-jugadores',
  templateUrl: './busqueda-jugadores.component.html',
  styleUrls: ['./busqueda-jugadores.component.css']
})
export class BusquedaJugadoresComponent implements OnInit {
  resultadosBusqueda: any;
  @Output() resultadosBusquedaChange = new EventEmitter<any>();
  ligaGuardadaEnSesion: any;
  temporadaEnSesion: any
  managerEnSesion: any;
  listaTemporadas: any[];
  private searchSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    private router: Router,
  ) {
    this.resultadosBusqueda = []
  }

  ngOnInit(): void {
    this.sharedService.obtenerListaEquiposNba().subscribe(
      () => {},
      error => {
        console.error('Error obteniendo lista de equipos NBA', error.message);
      }
    );
    this.sharedService.obtenerListaEquiposNombre().subscribe(
      () => {},
      error => {
        console.error('Error obteniendo lista de equipos', error.message);
      }
    );
    this.listaTemporadas = this.authService.getStoredProximasTemporadas();
    this.temporadaEnSesion = this.authService.getStoredTemporada();
    this.ligaGuardadaEnSesion = this.authService.getStoredLigaGuardada();
    this.managerEnSesion = this.authService.getStoredManager();

    this.searchSubscription = this.sharedService.searchResults$
      .pipe(debounceTime(10))
      .subscribe(data => {
        this.resultadosBusqueda = data;
        this.resultadosBusquedaChange.emit(this.resultadosBusqueda);
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
