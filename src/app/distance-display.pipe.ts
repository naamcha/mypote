import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distanceDisplay'
})
export class DistanceDisplayPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if( value > 1000)
      return "à" + Math.floor(value/1000) + "km";
    else if( value < 200)
      return "à" + Math.floor(value) + "m";
    else
      return "";
  }

}
