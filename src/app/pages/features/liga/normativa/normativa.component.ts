import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-normativa',
  templateUrl: './normativa.component.html',
  styleUrls: ['./normativa.component.css']
})
export class NormativaComponent implements OnInit {

  salariosPicks = [
    { pick: 1, salary: '4.8M' },
    { pick: 2, salary: '4.3M' },
    { pick: 3, salary: '3.9M' },
    { pick: 4, salary: '3.5M' },
    { pick: 5, salary: '3.3M' },
    { pick: 6, salary: '3.0M' },
    { pick: 7, salary: '2.7M' },
    { pick: 8, salary: '2.5M' },
    { pick: 9, salary: '2.3M' },
    { pick: 10, salary: '2.2M' },
    { pick: 11, salary: '2.1M' },
    { pick: 12, salary: '2.0M' },
    { pick: 13, salary: '2.0M' },
    { pick: 14, salary: '2.0M' },
    { pick: 15, salary: '1.9M' },
    { pick: 16, salary: '1.9M' },
    { pick: 17, salary: '1.8M' },
    { pick: 18, salary: '1.7M' },
    { pick: 19, salary: '1.6M' },
    { pick: 20, salary: '1.5M' },
    { pick: 21, salary: '1.4M' },
    { pick: 22, salary: '1.3M' },
    { pick: 23, salary: '1.2M' },
    { pick: 24, salary: '1.1M' },
    { pick: 25, salary: '1.0M' },
    { pick: 26, salary: '0.9M' },
    { pick: 27, salary: '0.8M' },
    { pick: 28, salary: '0.7M' },
  ];

  cantidadBonus = [
    { puesto: 1, bonus: '1.3M' },
    { puesto: 2, bonus: '1.2M' },
    { puesto: 3, bonus: '1.1M' },
    { puesto: 4, bonus: '1.0M' },
    { puesto: 5, bonus: '0.9M' },
    { puesto: 6, bonus: '0.8M' },
    { puesto: 7, bonus: '0.7M' },
    { puesto: 8, bonus: '0.6M' },
    { puesto: 9, bonus: '0.5M' },
    { puesto: 10, bonus: '0.4M' },
    { puesto: 11, bonus: '0.3M' },
    { puesto: 12, bonus: '0.2M' },
    { puesto: 13, bonus: '0.1M' },
    { puesto: 14, bonus: '0.0M' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  scrollTo(elementId: string): void {
    const headerHeight = 60; // Altura del encabezado en píxeles
    const element = document.getElementById(elementId);
    if (element) {
      const yOffset = element.offsetTop - headerHeight;
      window.scrollTo({ top: yOffset, behavior: 'smooth' });
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
