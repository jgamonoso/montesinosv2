import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    console.log('submit');
    debugger;
    this.authService.authenticate(this.form.value).subscribe(
      (response) => {
        debugger
        if (response.status === 'ok') {
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
