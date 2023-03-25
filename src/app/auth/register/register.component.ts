import { Component, OnInit } from '@angular/core';
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
  images = ['background-1.png', 'background-2.png', 'background-3.png', 'background-4.png',];
  backgroundImageStyle = '';

  constructor() {}

  ngOnInit(): void {

    this.randomImageSequence = this.generateRandomSequence(this.images.length);
    this.backgroundImageStyle = `url(${this.base_href}assets/images/background/${this.images[this.randomImageSequence[0]]})`;

    setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
      const randomImageIndex = this.randomImageSequence[this.currentImageIndex];
      this.backgroundImageStyle = `url(${this.base_href}assets/images/background/${this.images[randomImageIndex]})`;
    }, 15000); // Cambiar la imagen cada 30 segundos
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
