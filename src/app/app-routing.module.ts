import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Módulos
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

import { Error404Component } from './error404/error404.component';


const routes: Routes = [
  // path: pages PagesRoutingModule
  // auth: pages AuthRoutingModule
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', component: Error404Component },
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
