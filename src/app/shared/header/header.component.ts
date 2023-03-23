import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(event: Event): void {
    event.preventDefault(); // Previene la acción predeterminada del formulario
  }
  onSearchEnter(searchText: string): void {
    console.log('Search text:', searchText);
    // Aquí puedes utilizar el texto de búsqueda (searchText) para realizar la búsqueda
  }

  onSearchButton(event: MouseEvent, searchText: string): void {
    event.stopPropagation();
    console.log('Search text:', searchText);
    // Aquí puedes utilizar el texto de búsqueda (searchText) para realizar la búsqueda
  }

  toggleSearch(formElement: HTMLElement, searchInput?: HTMLInputElement): void {
    if (searchInput) {
      searchInput.value = '';
    }
    formElement.classList.toggle('visible');
  }
}
