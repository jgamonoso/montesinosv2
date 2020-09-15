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
          url: 'a',
        },
        {
          titulo: 'Equipos',
          url: 'progress',
        },
        {
          titulo: 'Lesionados',
          url: 'account-settings',
        },
        {
          titulo: 'Apuestas',
          url: 'account-settings2',
        },
        {
          titulo: 'Historico',
          url: 'account-settings3',
        },
        {
          titulo: 'Normativa',
          url: '4',
        },
        {
          titulo: 'Cambiar de liga',
          url: '5',
        },
      ],
    },
  ];

  constructor() {
    console.log('Hola, soy AuthService');
  }
}
