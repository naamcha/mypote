import { Injectable } from '@angular/core';
import { Site } from './core/models/site.model';
import { Observable, interval, from, forkJoin, throwError } from 'rxjs';
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
  networks: HotspotNetwork[];
  scannedZones: Zone;
  distanceToSite: number;

  constructor(
    private nfc: NFC, 
    private hotspot: Hotspot, 
    private sitesService: SitesService,
    private geolocation: Geolocation
  ) {}

  public microlocation: MicroLocalisation;
  private wifiFired: Boolean;
  private nfcFired: Boolean;
  

  public watchAll(sites:Sites):void{
    console.log('watchAll');
    let nfcObs = this.scanNfc(sites).subscribe(microloc => {
      console.log("watchAll nfcObs", microloc);
      this.priorityManager('nfc',microloc);
    });
    let distObs = this.watchDistanceToSite(sites).subscribe(microloc => {
      console.log("watchAll distObs", microloc);
      this.priorityManager('distObs',microloc);
    });
    let wifiObs = interval(4000).subscribe( data => {
      this.scanWifi(sites).subscribe(
        microloc => {
          console.log("watchAll wifiObs", microloc);
          this.priorityManager('wifiObs',microloc);
        }
      )
    });
  }

  priorityManager(eventType:string,microlocation:MicroLocalisation){
    switch(eventType){
      case 'distObs':
        if(!this.microlocation) this.microlocation = microlocation;
        break;
      case 'wifiObs':
        break;
    }
  }

  scanNfc(sites : Sites): Observable<MicroLocalisation>{
    console.log('scanNFC started')
    return this.nfc.addNdefListener().pipe(
      map(data => {
        let tagId = this.nfc.bytesToHexString(data.tag.id);
        let site = sites.getSiteFromScannedNFC(tagId);
        if(!site){
          let error = new Error('no site found from ncf scanned tag ' )
        }
        else{
          let tagZone = site.quarters.getZoneFromScannedNFCTag(tagId);
          if(!tagZone){
            let error = new Error('no zone found from ncf scanned tag on site '+site.name );
          }else{
            return new MicroLocalisation(site,[tagZone],0);
          }
        }
      })
    );
  }

  watchDistanceToSite(sites:Sites): Observable<MicroLocalisation>{
    return this.geolocation.watchPosition().pipe(map((data) => {
      console.log('watchPosition', data);
      let currentCoordinate = new Coordinate(data.coords.latitude,data.coords.longitude);
      let nearestSite = sites.getNearestSite(currentCoordinate);
      return new MicroLocalisation(nearestSite,undefined,sites.getDistanceToNearestSite(currentCoordinate)) 
    }));
  }
  
  // scanWifi(sites : Sites): Observable<HotspotNetwork[]>{
  scanWifi(sites : Sites): Observable<MicroLocalisation>{
    const scanWifi = from(this.hotspot.scanWifi());
    return scanWifi.pipe(map(
      (networks: HotspotNetwork[])  => {
        networks = networks.sort((a,b)=> a.level - b.level);
        let site = sites.getSiteFromScannedWifi(networks);
        return new MicroLocalisation(site,site.quarters.getZonesFromScannedWifi(networks),0);
      })
    )
  };
}