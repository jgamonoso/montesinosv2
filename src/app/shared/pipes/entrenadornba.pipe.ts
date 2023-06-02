import { Pipe, PipeTransform } from '@angular/core';
// import { ManagerService } from '../services/manager.service';


@Pipe({
  name: 'entrenadornba'
})
export class EntrenadornbaPipe implements PipeTransform {

  //valueAbr: any[] = [];

  // constructor( private _manager: ManagerService ) {
  // }

  constructor() {
  }

  // getEquipoNba( idx:number ) {
  //   this._manager.getEquipoNba( idx )
  //   .map((resp:any) => resp.abrev )
  //   .subscribe( abreviado => {
  //     // this.valueAbr = abreviado;
  //     console.log("function A: " + abreviado );
  //     // console.log("function B: " + this.valueAbr );
  //     //return this.valueAbr;
  //     return abreviado;
  //   });
  // }

  transform( fkEntrenador: string ): any {

    switch ( fkEntrenador ) {
      case '1': return 'Nate McMillan (ATL)';
           //return this.getEquipoNba(fkEquipoNba);
           //console.log("case A: " + this.valueAbr );
           // console.log("case B: " + this.getEquipoNba(fkEquipoNba) );
           //return this.valueAbr;
      case '2': return 'BKN';
      case '3': return 'BOS';
      case '4': return 'CHA';
      case '5': return 'CHI';
      case '6': return 'J. B. Bickerstaff (CLE)';
      case '7': return 'DAL';
      case '8': return 'DEN';
      case '9': return 'DET';
      case '10': return 'GSW';
      case '11': return 'HOU';
      case '12': return 'IND';
      case '13': return 'LAC';
      case '14': return 'LAL';
      case '15': return 'MEM';
      case '16': return 'MIA';
      case '17': return 'MIL';
      case '18': return 'MIN';
      case '19': return 'NOR';
      case '20': return 'NYK';
      case '21': return 'OKC';
      case '22': return 'ORL';
      case '23': return 'PHI';
      case '24': return 'PHO';
      case '25': return 'POR';
      case '26': return 'SAC';
      case '27': return 'SAS';
      case '28': return 'TOR';
      case '29': return 'UTA';
      case '30': return 'WAS';
      case '31': return 'FA';
      default: return 'OTR';
    }

    //let value = '';

    // this._manager.getEquipoNba( fkEquipoNba )
    //     .map( params => params['abrev'] )
    //     .subscribe( abreviado => {
    //       console.log( abreviado );
    //       this.value = abreviado;
    //       return abreviado;
    //     });
    //
    // console.log( this.value );
    //
    // return this.value;

  }

}
