import { Component, OnInit } from '@angular/core';
import { JugadoresPruebaService } from 'src/app/services/jugadores-prueba.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit {
  datos: any;
  constructor(private jugadoresPruebaService: JugadoresPruebaService) {}

  ngOnInit(): void {
    this.jugadoresPruebaService.getJugadores().subscribe(
      (resp) => {
        if (resp) {
          this.datos = resp;
        }
      },
      (err) => console.warn(err)
    );
  }
}
