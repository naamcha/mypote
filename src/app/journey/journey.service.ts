import { Injectable } from '@angular/core';
import { MicrolocLight, MicroLocalisation } from '../core/models/microlocalisation.model';
import * as navigationData from '../../assets/data/navigation.json'
import { Navigation, Segment } from '../core/models/navigation.model';
import { Site } from '../core/models/site.model';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JourneyService {

  public navHistory = new BehaviorSubject<MicrolocLight[]>(undefined);
  private navigation: Navigation;
  public currentNavSegments: Segment[];

  constructor() {
    this.currentNavSegments = [];
    this.navigation = new Navigation().deserialize(navigationData.nav);
  }

  startNav(endCheckPoint: MicrolocLight): Segment {
    // get last checkpoint in navHistory
    let navhist = this.navHistory.getValue()
    console.log("startNav",navhist)
    let startCheckPoint = navhist[navhist.length-1];
    let segments = this.computeNavigation(startCheckPoint, endCheckPoint);
    this.currentNavSegments = segments;
    return this.walkNav(startCheckPoint);
  }
  walkNav(currentCheckPoint: MicrolocLight): Segment {
    let nextSegment = this.getNextCurrentNavSegment();
    if (nextSegment) {
      return (currentCheckPoint == nextSegment.startPoint) ? this.currentNavSegments.pop() : undefined;
    }
    else {
      return undefined;
    }
  }
  getNextCurrentNavSegment(): Segment {
    return (this.currentNavSegments.length > 0) ? this.currentNavSegments[this.currentNavSegments.length - 1] : undefined;
  }
  getNextSegmentFromStartPoint(startCheckPoint: MicrolocLight, navigation: Segment[]): Segment {
    return navigation.find(seg => seg.startPoint == startCheckPoint);
  }
  computeNavigation(startCheckPoint: MicrolocLight, endCheckPoint: MicrolocLight): Segment[] {
    console.log('////// computeNavigation ///////', startCheckPoint, endCheckPoint, this.navigation.getSegmentsFromStartEnd(startCheckPoint, endCheckPoint))
    return this.navigation.getSegmentsFromStartEnd(startCheckPoint, endCheckPoint);
  }
  pushCheckPoint(microlocation: MicrolocLight): void {
    let navhistoryLength = (this.navHistory && this.navHistory.getValue())? this.navHistory.getValue().length:0;
    console.log(microlocation, this.navHistory[navhistoryLength - 1], microlocation !== this.navHistory[navhistoryLength - 1]);
    if (navhistoryLength == 0) {
      console.log('push checkpoint 0');
      this.pushInNavHistory(microlocation);
    }
    else if (!this.navHistory[navhistoryLength - 1].zoneId) {
      if (this.navHistory[navhistoryLength - 1].quarterId !== microlocation.quarterId) {
        console.log('push checkpoint 1');
        this.pushInNavHistory(microlocation);
      }
    }
    else {
      if (this.navHistory[navhistoryLength - 1].zoneId !== microlocation.zoneId) {
        console.log('push checkpoint 2');
        this.pushInNavHistory(microlocation);
      }
    }
  }
  private pushInNavHistory(microlight: MicrolocLight): void {
    console.log('pushInNavHistory 0',microlight,this.navHistory)
    if(microlight){
      let tmpNavHist = (this.navHistory.getValue())?this.navHistory.getValue():[];
      tmpNavHist.push(microlight);
      this.navHistory.next(tmpNavHist);
    }
  }
}
