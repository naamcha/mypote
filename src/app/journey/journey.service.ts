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
  public navSegment = new BehaviorSubject<Segment>(undefined)
  private navigation: Navigation;
  public currentNavSegments: Segment[];
  endCheckPoint: MicrolocLight;

  constructor() {
    this.currentNavSegments = [];
    this.navigation = new Navigation().deserialize(navigationData.nav);
  }
  startNav(endCheckPoint: MicrolocLight): Segment {
    this.endCheckPoint = endCheckPoint;
    // get last checkpoint in navHistory
    let navhist = this.navHistory.getValue()
    console.log("startNav",navhist);
    let startCheckPoint = navhist[navhist.length-1];
    console.log("startNav",this.currentNavSegments);
    return this.refreshNav(startCheckPoint); 
  }
  refreshNav(startCheckPoint:MicrolocLight){
    if(this.endCheckPoint /* nav already asked */){
      this.currentNavSegments = this.computeNavigation(startCheckPoint, this.endCheckPoint);
      return this.walkNav();
    }else{ /* no nav running */
      return undefined;
    }
  }
  walkNav(): Segment {
    let segment = this.getCurrentNavSegment();
    if (segment) {
      this.navSegment.next(segment);
      return segment;
    }
    else{
      return undefined;
    }
  }
  getCurrentNavSegment(): Segment {
    return (this.currentNavSegments.length > 0) ? this.currentNavSegments[0] : undefined;
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
    const navHist = this.navHistory.getValue();
    let navhistoryLength = (this.navHistory && navHist)? navHist.length:0;
    if (navhistoryLength == 0) {
      // first location
      console.log('push checkpoint 0 - no nav history');
      this.pushInNavHistory(microlocation);
    }
    //changinq quarter
    else if(navHist[navhistoryLength - 1].quarterId !== microlocation.quarterId){
      this.pushInNavHistory(microlocation);
    }
    //changing zone in same quarter
    else{ 
      // zone to zone in same quarter
      if (navHist[navhistoryLength - 1].zoneId !== microlocation.zoneId) {
        // zone undefined to zone defined
        if(navHist[navhistoryLength - 1].zoneId == undefined && microlocation.zoneId !== undefined){
          this.pushInNavHistory(microlocation);
        }
        // zone defined to zone undefined 
        else{
          // DO NOTHING (avoid bumping to wifi localisation after fireing nfc)
        }
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
