import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  credentials = {
    login: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    console.log('submit');
    this.authService.authenticate(this.credentials).subscribe(
      (response) => {
        debugger
        if (response.status === 'ok') {
          // Navegar a la página principal (por ejemplo, DashboardComponent)
          this.router.navigateByUrl('/dashboard');
        } else {
          console.error('Error de inicio de sesión');
        }
      },
      (error) => {
        debugger
        console.error('Error de inicio de sesión', error);
      }
    );
  }
}
