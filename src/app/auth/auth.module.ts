import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

//Modulos
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../shared/modules/material.module/material.module';

//Componentes
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetComponent } from './reset/reset.component';
import { LoadingModule } from '../shared/modules/loading.module/loading.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ResetComponent
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    ResetComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule,
    MaterialModule,
    LoadingModule,
  ],
})
export class AuthModule { }
