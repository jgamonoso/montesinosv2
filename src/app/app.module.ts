import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Módulos
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { Error404Component } from './error404/error404.component';
import { MaterialModule } from './shared/modules/material.module';

@NgModule({
  declarations: [
    AppComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule,
    MaterialModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
