import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { LangService } from 'src/app/shared/modules/lang.module/service/lang.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css'],
})
export class ResetComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  base_href = environment.BASE_HREF;
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
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });

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
