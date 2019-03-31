import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/index';

import * as sitesData from '../../assets/data/sites.json';
import { Site } from '../core/models/site.model';
import { Sites } from '../core/models/sites.model.js';
import { Coordinate } from 'tsgeo/Coordinate';
import { Geolocation } from '@ionic-native/geolocation/ngx'

@Injectable({
  providedIn: 'root'
})
export class SitesService {
  public currentSiteId = new BehaviorSubject<string>('75');
  
  constructor( private geolocation: Geolocation ) {
    this.geolocation.getCurrentPosition().then(
      (resp) => {
        let coordinate1 = new Coordinate(resp.coords.latitude, resp.coords.longitude);
        // let coordinate1 = new Coordinate(43.325608, 5.445956);
        let sites : Sites = this.getSites();
        let currentSiteId = sites.getNearestSite(coordinate1).id;
        console.log(sites.getNearestSite(coordinate1),sites.getDistanceToNearestSite(coordinate1));
    }).catch((error) => {
      console.log('Error getting location', error);
    });;
  }

  public getSites(): Sites {
    return new Sites().deserialize(sitesData.sites);
  }

  public getSite(id): Site {
    return this.getSites().sites.find(site => site.id === id);
  } 
  public setSite(siteId): void {
    this.currentSiteId.next(siteId);
  }
}
