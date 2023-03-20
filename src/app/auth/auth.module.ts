import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

//Modulos
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Componentes
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TranslateModule } from '@ngx-translate/core';
import { ResetComponent } from './reset/reset.component';

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
    TranslateModule
  ],
})
export class AuthModule { }
