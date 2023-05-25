import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-info',
  templateUrl: './show-info.component.html',
  styleUrls: ['./show-info.component.css']
})
export class ShowInfoComponent implements OnInit {

  titulo: string;
  subtitulo: string;
  redirectUrl: string;

  constructor(
    private router: Router,
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      titulo: string,
      subtitulo: string,
      redirectUrl: string
    };
    this.titulo = state.titulo;
    this.subtitulo = state.subtitulo;
    this.redirectUrl = state.redirectUrl;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.redirect();
    }, 3000);
  }

  redirect(): void {
    this.router.navigate([this.redirectUrl]);
  }
}
