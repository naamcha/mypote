import { Injectable } from '@angular/core';
import { MicroLocalisation } from '../core/models/microlocalisation.model';
import * as navigation from '../../assets/data/navigation.json'
import { Navigation, Segment } from '../core/models/navigation.model';

@Injectable({
  providedIn: 'root'
})
export class JourneyService {

  private navHistory: MicroLocalisation[];
  private navigation: Navigation;

  constructor() {
    this.navHistory = [];
    this.navigation = new Navigation().deserialize(navigation);
  }

  computeNavigation(startCheckPoint:MicroLocalisation,endCheckPoint:MicroLocalisation):Segment[]{
    return this.navigation.getSegmentsFromStartEnd(startCheckPoint,endCheckPoint);
  }
  getNextSegmentFromStartPoint(startCheckPoint:MicroLocalisation,navigation:Segment[]):Segment{
    return navigation.find(seg => seg.startPoint == startCheckPoint.toMicrolight());
  }
  pushCheckPoint(microlocation: MicroLocalisation): void {
    console.log(microlocation, this.navHistory[this.navHistory.length - 1], microlocation !== this.navHistory[this.navHistory.length - 1]);
    if (this.navHistory.length == 0) {
      console.log('push checkpoint 0');
      this.navHistory.push(microlocation);
    }
    else if (!this.navHistory[this.navHistory.length - 1].zone) {
      if (this.navHistory[this.navHistory.length - 1].quarter !== microlocation.quarter){
        console.log('push checkpoint 1');
        this.navHistory.push(microlocation);
      }
    }
    else{
      if (this.navHistory[this.navHistory.length - 1].zone.id !== microlocation.zone.id) {
        console.log('push checkpoint 2');
        this.navHistory.push(microlocation);
      }
    } 
  }
  popCheckPoint(): MicroLocalisation {
    return this.navHistory.pop();
  }
  getNavHistory(): MicroLocalisation[] {
    return this.navHistory;
  }
  computeCheckPointJourney(startCheckPoint:MicroLocalisation,endCheckPoint:MicroLocalisation):MicroLocalisation[]{
    let checkPointJourney: MicroLocalisation[];
    // Works only with a start 
    return checkPointJourney;
  }
}
