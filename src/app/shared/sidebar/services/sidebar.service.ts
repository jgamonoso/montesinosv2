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
          url: 'index.html',
        },
        {
          titulo: 'Derechos',
          url: 'index2.html',
        },
        {
          titulo: 'Draft Picks',
          url: 'index3.html',
        },
        {
          titulo: 'Trading Block',
          url: 'index4.html',
        },
      ],
    },
    {
      titulo: 'Agencia Libre',
      icono: 'mdi mdi-file',
      submenu: [
        {
          titulo: 'Jugadores (AL)',
          url: 'index.html',
        },
        {
          titulo: 'Jugadores (ALSeason)',
          url: 'index2.html',
        },
        {
          titulo: 'Jugadores (ALOffseason)',
          url: 'index3.html',
        },
        {
          titulo: 'Pujas Activas (y)',
          url: 'index4.html',
        },
      ],
    },
    {
      titulo: 'Renovaciones',
      icono: 'mdi mdi-chart-bubble',
      submenu: [
        {
          titulo: 'Jugadores',
          url: 'index.html',
        },
        {
          titulo: 'Pujas Activas (x)',
          url: 'index2.html',
        },
      ],
    },
    {
      titulo: 'Draft',
      icono: 'mdi mdi-map-marker',
      submenu: [
        {
          titulo: 'Draft',
          url: 'index.html',
        },
      ],
    }
  ];

  constructor() {
  }
}
