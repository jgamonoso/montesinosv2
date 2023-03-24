import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { JugadoresPruebaService } from 'src/app/services/jugadores-prueba.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit {

  datos: any;
  credenciales: any;

  constructor(
    private jugadoresPruebaService: JugadoresPruebaService,
    private authService: AuthService,
    // public readonly authService: AuthService,
  ) {}

  ngOnInit(): void {
    // this.jugadoresPruebaService.getJugadores().subscribe(
    //   (resp) => {
    //     if (resp) {
    //       this.datos = resp;
    //     }
    //   },
    //   (err) => console.warn(err)
    // );

    this.credenciales = this.authService.getStoredCredentials();

  }
}
