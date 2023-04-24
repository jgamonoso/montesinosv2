import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'equipoliga'
})
export class EquipoligaPipe implements PipeTransform {

  transform( fkEquipoOri: string ): any {

    switch( fkEquipoOri ) {

      case '1': return 'Luxers';
      case '2': return 'TorrejonBlazers';
      case '3': return 'Pumpin';
      case '4': return 'PeteTeam Badajoz';
      case '5': return 'Durum di Pene';
      case '6': return 'Pimpinelos Team';
      case '7': return 'Aphex Team';
      case '8': return 'Bug Hyenas';
      case '9': return 'Balboateam';
      case '10': return 'Ragnarok';
      case '11': return 'Presi NBA';
      case '12': return 'Celticmania';
      case '13': return 'Paketenaikos';
      case '14': return 'CB Granada';
      case '15': return 'Unnecesary Ruffness';
      case '16': return 'Asturexiliators Team';
      case '17': return 'Danirian';
      case '18': return 'HEATlanta Beers';
      case '19': return 'Higthlanders';
      case '20': return 'Breogan';
      case '21': return 'Pinocho Team';
      case '22': return 'Navetos CB';
      case '23': return 'Deza Matracos';
      case '24': return 'Manu Mavericks';
      case '25': return 'Brother in Arms';
      case '26': return 'Phil Boys';
      case '27': return 'Atlanta Tordos';
      case '28': return 'Objetivo Tu Hermana';
      default: return 'OTR';

    }

  }

}
