import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/index';

import * as sitesData from '../../assets/data/sites.json';
import { Site } from '../core/models/site.model';
import { Sites } from '../core/models/sites.model';
import { Coordinate } from 'tsgeo/Coordinate';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class SitesService {
  public currentSiteId = new BehaviorSubject<number>(75);

  constructor(
    private geolocation: Geolocation,
    private platform: Platform,
    private nativeStorage: NativeStorage
  ) {
    this.geolocation.getCurrentPosition().then(
      (resp) => {
        let coordinate1 = new Coordinate(resp.coords.latitude, resp.coords.longitude);
        // let coordinate1 = new Coordinate(43.325608, 5.445956);
        let sites: Sites = this.getSites();
        let currentSiteId = sites.getNearestSite(coordinate1).id;
      }).catch((error) => {
        console.log('Error getting location', error);
      });
  }

  public getSites(): Sites {
    this.nativeStorage.setItem('sites', new Sites().deserialize(sitesData.sites))
      .then(
        () => console.log('Stored item!'),
        error => console.error('Error storing item', error)
      );
    return new Sites().deserialize(sitesData.sites);
  }

  public getSite(id: number): Site {
    console.log(id)
    return this.getSites().sites.find(site => { console.log(site.id, id); return site.id === id });
  }

  public setSite(siteId): void {
    console.log(`setSite with id`, siteId);
    this.currentSiteId.next(siteId);
  }

  public navigateTo(site) {
    const latitude = site.position.lat;
    const longitude = site.position.lng;
    let destination = latitude + ',' + longitude;

    if (this.platform.is('ios')) {
      window.open('maps://?q=' + destination, '_system');
    } else {
      let label = encodeURI('site de ' + site.name);
      window.open('geo:0,0?q=' + destination, + '(' + label + ')', '_system');
    }
  }
}
