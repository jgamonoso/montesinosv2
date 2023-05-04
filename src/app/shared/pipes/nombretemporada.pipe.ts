import { Pipe, PipeTransform } from '@angular/core';
// import { ManagerService } from '../services/manager.service';

@Pipe({
  name: 'nombretemporada'
})
export class NombretemporadaPipe implements PipeTransform {

  // pruebaTemporadas: any = {};

  // constructor(private _manager: ManagerService) {
  // }

  transform( fkTemporada: string ): any {

    switch ( fkTemporada ) {
      case '1': return '15/16';
      case '2': return '16/17';
      case '3': return '17/18';
      case '4': return '18/19';
      case '5': return '19/20';
      case '6': return '20/21';
      case '7': return '21/22';
      case '8': return '22/23';
      case '9': return '23/24';
      case '10': return '24/25';
      case '11': return '25/26';
      case '12': return '26/27';
      case '13': return '27/28';
      case '14': return '28/29';
      case '15': return '29/30';
      default: return 'OTR';
    }
  }

}
