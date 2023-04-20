import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Módulos
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

//Componentes
import { Error404Component } from './shared/error404/error404.component';

declare const window: any;

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module')
      .then(m => m.AuthModule)
      .catch(error => {
        if (window) { window.location.reload(); }
      })
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule)
      .catch(error => {
        if (window) { window.location.reload(); }
      })
  },
  {
    path: '**',
    component: Error404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
