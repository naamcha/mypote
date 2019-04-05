import { Injectable } from '@angular/core';
import { Zone } from '../core/models/site.model'


@Injectable({
  providedIn: 'root'
})
export class JourneyService {

  private checkPoints: Zone[];

  constructor() { }

  pushCheckPoint(zone:Zone):void{
    this.checkPoints.push(zone);
  }
  popCheckPoint():Zone{
    return this.checkPoints.pop();
  }
  getCheckPoints():Zone[]{
    return this.checkPoints;
  }
}
