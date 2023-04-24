import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'concatPositions'
})
export class ConcatPositionsPipe implements PipeTransform {

  transform(positions: any[]): string {
    return positions.map(pos => pos.nombre).join(', ');
  }
}