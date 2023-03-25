import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  images = [
    'background-1.jpg',
    'background-2.jpg',
    'background-3.jpg',
    'background-4.jpg',
    'background-5.jpg',
    'background-6.jpg',
    'background-9.jpg',
  ];

  constructor() {}
}
