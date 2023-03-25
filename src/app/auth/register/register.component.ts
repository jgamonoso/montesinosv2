import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
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
    private sharedService: SharedService
  ) {
    this.images = this.sharedService.images;
  }

  ngOnInit(): void {

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
}
