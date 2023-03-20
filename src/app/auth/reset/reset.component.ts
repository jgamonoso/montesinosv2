import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LangService } from 'src/app/shared/modules/lang.module/service/lang.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css'],
})
export class ResetComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public langService: LangService,
  ) {
    console.log('reset!!')
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    console.log('submit');
    this.authService.authenticate(this.form.value).subscribe(
      (response) => {
        if (response.status === 'ok') {
          this.router.navigateByUrl('/dashboard');
        } else {
          console.error('Error de inicio de sesión');
        }
      },
      (error) => {
        console.error('Error de inicio de sesión', error);
      }
    );
  }
}
