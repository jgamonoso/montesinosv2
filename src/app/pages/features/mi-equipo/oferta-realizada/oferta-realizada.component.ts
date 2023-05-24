import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-oferta-realizada',
  templateUrl: './oferta-realizada.component.html',
  styleUrls: ['./oferta-realizada.component.css']
})
export class OfertaRealizadaComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.verOfertasEnviadas();
    }, 3000);
  }

  verOfertasEnviadas(): void {
    this.router.navigate(['/mi-equipo/ofertas-enviadas']);
  }
}