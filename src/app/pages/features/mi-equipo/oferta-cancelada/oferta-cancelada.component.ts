import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-oferta-cancelada',
  templateUrl: './oferta-cancelada.component.html',
  styleUrls: ['./oferta-cancelada.component.css']
})
export class OfertaCanceladaComponent implements OnInit {

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