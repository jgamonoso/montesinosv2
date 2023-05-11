import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: any[] = [
    {
      titulo: 'Liga',
      icono: 'mdi mdi-gauge',
      submenu: [
        {
          titulo: 'Noticias',
          url: '/liga/noticias',
        },
        {
          titulo: 'Equipos',
          url: '/liga/equipos',
        },
        {
          titulo: 'Lesionados',
          url: '/liga/lesionados-liga',
        },
        {
          titulo: 'Apuestas',
          url: '/liga/apuestas-liga',
        },
        {
          titulo: 'Historico',
          url: '/liga/historico',
        },
        {
          titulo: 'Normativa',
          url: '/liga/normativa',
        },
        {
          titulo: 'Cambiar de liga',
          url: '/liga/cambiar-liga',
        },
      ],
    },
    {
      titulo: 'Mercado',
      icono: 'mdi mdi-bullseye',
      submenu: [
        {
          titulo: 'Jugadores',
          url: '/mercado/jugadores',
        },
        {
          titulo: 'Derechos',
          url: '/mercado/derechos',
        },
        {
          titulo: 'Draft Picks',
          url: '/mercado/draft-picks-mercado',
        },
        {
          titulo: 'Trading Block',
          url: '/mercado/trading-block',
        },
      ],
    },
    {
      titulo: 'Agencia Libre',
      icono: 'mdi mdi-file',
      submenu: [
        {
          titulo: 'Jugadores (ALSeason)',
          url: '/agencia-libre/jugadores-al-season',
        },
        {
          titulo: 'Jugadores (AL)',
          url: '/agencia-libre/jugadores-al',
        },
        {
          titulo: 'Jugadores (ALOffseason)',
          url: '/agencia-libre/jugadores-al-offseason',
        },
        {
          titulo: 'Pujas Activas',
          url: '/agencia-libre/pujas-activas-al',
        },
      ],
    },
    {
      titulo: 'Renovaciones',
      icono: 'mdi mdi-chart-bubble',
      submenu: [
        {
          titulo: 'Jugadores',
          url: '/renovaciones/jugadores-renovaciones',
        },
        {
          titulo: 'Pujas Activas (x)',
          url: '/renovaciones/pujas-activas-renovaciones',
        },
      ],
    },
    {
      titulo: 'Draft',
      icono: 'mdi mdi-map-marker',
      submenu: [
        {
          titulo: 'Draft',
          url: '/draft/draft-picks',
        },
      ],
    }
  ];

  constructor() {
  }
}
