import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Modulos
import { RouterModule } from '@angular/router';
import { HttpModule } from './modules/http.module/http.module';
import { TranslateModule } from '@ngx-translate/core';
import { LoadingModule } from 'src/app/shared/modules/loading.module/loading.module';

//Componentes
import { BreadcrumbsComponent } from 'src/app/shared/breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { SidebarComponent } from 'src/app/shared/sidebar/sidebar.component';
import { Error404Component } from 'src/app/shared/error404/error404.component';
import { AccountSettingsComponent } from 'src/app/pages/account-settings/account-settings.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    HttpModule,
    LoadingModule
  ],
  declarations: [
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    AccountSettingsComponent,
    Error404Component
  ],
  exports: [
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    Error404Component,
    AccountSettingsComponent,
    HttpModule,
    LoadingModule
  ],
})
export class SharedModule { }
