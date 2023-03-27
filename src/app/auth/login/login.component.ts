import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
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
  currentImageIndex = 0;
  randomImageSequence: number[];
  images = [];

  backgroundImageStyle1 = '';
  backgroundImageStyle2 = '';
  opacity1 = '1';
  opacity2 = '0';
  currentLayer = 1;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public langService: LangService,
    private sharedService: SharedService
  ) {
    this.images = this.sharedService.images;

    this.form = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    let sessionActive = this.authService.getStoredCredentials();

    if (sessionActive && sessionActive.status === 'ok') {
      this.router.navigateByUrl('/dashboard');
    }

    this.randomImageSequence = this.generateRandomSequence(this.images.length);
    this.backgroundImageStyle1 = `url(${this.base_href}assets/images/background/${this.images[this.randomImageSequence[0]]})`;

    setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
      const randomImageIndex = this.randomImageSequence[this.currentImageIndex];
      const nextBackgroundImageStyle = `url(${this.base_href}assets/images/background/${this.images[randomImageIndex]})`;

      if (this.currentLayer === 1) {
        this.backgroundImageStyle2 = nextBackgroundImageStyle;
        this.opacity1 = '0';
        this.opacity2 = '1';
        this.currentLayer = 2;
      } else {
        this.backgroundImageStyle1 = nextBackgroundImageStyle;
        this.opacity1 = '1';
        this.opacity2 = '0';
        this.currentLayer = 1;
      }
    }, 15000);
  }

  generateRandomSequence(length: number): number[] {
    const sequence = Array.from({ length }, (_, i) => i);
    for (let i = sequence.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [sequence[i], sequence[j]] = [sequence[j], sequence[i]];
    }
    return sequence;
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
    if (value) {
      this.authService.saveRemember();
    } else {
      this.authService.deleteRemember();
    }
  }
}
