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
    'background-8.jpg',
    'background-10.jpg',
    'background-11.jpg',
    'background-12.jpg',
    'background-13.jpg',
  ];

  constructor() {}
}