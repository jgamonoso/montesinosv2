import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LangService } from 'src/app/shared/modules/lang.module/service/lang.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  base_href = environment.BASE_HREF;
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public langService: LangService,
  ) { }

  ngOnInit(): void {
    let sessionActive = this.authService.getStoredCredentials();

    if (sessionActive && sessionActive.status === 'ok') {
      this.router.navigateByUrl('/dashboard');
    } else {
      this.form = this.formBuilder.group({
        login: ['', Validators.required],
        password: ['', Validators.required]
      });
    }
  }

  login() {
    console.log('submit');
    this.authService.authenticate(this.form.value).subscribe(
      (response) => {
        if (response.status === 'ok') {
          this.router.navigateByUrl('/dashboard');
        } else {
          console.error('Error de inicio de sesión');
          this.errorMessage = response.message;
        }
      },
      (error) => {
        console.error('Error de inicio de sesión', error);
        this.errorMessage = 'Login error';
      }
    );
  }

  setRemember(value: boolean): void {
    this.authService.remember = value;
  }
}
