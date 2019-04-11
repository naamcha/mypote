import { Injectable } from '@angular/core';
import { Site } from './core/models/site.model';
import { Observable, interval, from, forkJoin, throwError, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Zone } from './core/models/site.model';
import { Hotspot, HotspotNetwork } from '@ionic-native/hotspot/ngx';
import { NFC } from '@ionic-native/nfc/ngx';
import { SitesService } from './sites/sites.service';
import { Sites } from './core/models/sites.model';
import { MicroLocalisation } from './core/models/microlocalisation.model';
import { Geolocation } from '@ionic-native/geolocation/ngx'
import { Coordinate } from 'tsgeo/Coordinate';

@Injectable({
  providedIn: 'root'
})
export class MicroLocalisationService {


  constructor(
    private nfc: NFC,
    private hotspot: Hotspot,
    private geolocation: Geolocation
  ) { }

  public microlocation = new BehaviorSubject<MicroLocalisation>(undefined);
  private wifiFired: Boolean;
  private nfcFired: Boolean;


  public watchAll(sites: Sites): void {
    let nfcObs = this.scanNfc(sites).subscribe(microloc => {
      console.log("watchAll nfcObs", microloc);
      this.priorityManager('nfcObs', microloc);
    });
    let distObs = this.watchDistanceToSite(sites).subscribe(microloc => {
      console.log("watchAll distObs", microloc);
      this.priorityManager('distObs', microloc);
    });
    let wifiObs = interval(1000).subscribe(data => {
      this.scanWifi(sites).subscribe(
        microloc => {
//           console.log("watchAll wifiObs", microloc);
          this.priorityManager('wifiObs', microloc);
        }
      )
    });
  }

  priorityManager(eventType: string, microlocation: MicroLocalisation) {
    if (microlocation) {
      switch (eventType) {
        case 'distObs':
           console.log('distObs')
          if (this.microlocation == undefined) {
            this.microlocation.next(microlocation);
            //unsuscribe
          }
          break;
        case 'wifiObs':
          //console.log(microlocation)
          if (
            this.microlocation == undefined
            || this.microlocation.getValue() == undefined
            || this.microlocation.getValue().quarter.id !== microlocation.quarter.id
          ) {
            // console.log('send microloc event 22', this.microlocation.getValue().quarter.id, microlocation.quarter.id)
            this.microlocation.next(microlocation);
          }
          break;
        case 'nfcObs':
          this.microlocation.next(microlocation);
          break;
      }
    }
  }

  scanNfc(sites: Sites): Observable<MicroLocalisation> {
    // console.log('scanNFC started')
    return this.nfc.addNdefListener().pipe(
      map(data => {
        let tagId = this.nfc.bytesToHexString(data.tag.id);
        let site = sites.getSiteFromScannedNFC(tagId);
        // console.log('scanNfc',site,tagId)
        if (site === undefined) {
          let error = new Error('no site found from ncf scanned tag ')
        }
        else {
          let quarter = site.quarters.getQuarterFromScannedNfc(tagId);
          let tagZone = quarter.getZoneFromScannedNfc(tagId);
          if (tagZone == undefined) {
            // console.log('scanNfc error')
            let error = new Error('no zone found from ncf scanned tag on site ' + site.name);
          } else {
            // console.log('scanNfc',site, quarter, tagZone, 0)
            return new MicroLocalisation(site, quarter, tagZone, 0);
          }
        }
      })
    );
  }

  watchDistanceToSite(sites: Sites): Observable<MicroLocalisation> {
    return this.geolocation.watchPosition().pipe(map((data) => {
      let currentCoordinate = new Coordinate(data.coords.latitude, data.coords.longitude);
      let nearestSite = sites.getNearestSite(currentCoordinate);
      return new MicroLocalisation(nearestSite, undefined, undefined, sites.getDistanceToNearestSite(currentCoordinate))
    }));
  }

  // scanWifi(sites : Sites): Observable<HotspotNetwork[]>{
  scanWifi(sites: Sites): Observable<MicroLocalisation> {
    const scanWifi = from(this.hotspot.scanWifi());
    return scanWifi.pipe(map(
      (networks: HotspotNetwork[]) => {
        networks = networks.sort((a, b) => a.level - b.level);
        let site = sites.getSiteFromScannedWifi(networks);
        if (site) {
          let quarter = site.quarters.getQuarterFromScannedWifi(networks);
          return new MicroLocalisation(site, quarter, undefined, 0);
        }
        else {
          return undefined;
        }
      })
    )
  };
}	
