import { Injectable } from '@angular/core';
import { Site } from './core/models/site.model';
import { Observable, interval, from, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Zone } from './core/models/site.model';
import { Hotspot, HotspotNetwork } from '@ionic-native/hotspot/ngx';
import { NFC } from '@ionic-native/nfc/ngx';
import { SitesService } from './sites/sites.service';
import { Sites } from './core/models/sites.model';
import { MicroLocalisation } from './core/models/microlocalisation.model';

@Injectable({
  providedIn: 'root'
})
export class MicroLocalisationService {
  networks: HotspotNetwork[];
  scannedZones: Zone;

  constructor(
    private nfc: NFC, 
    private hotspot: Hotspot, 
    private sitesService: SitesService  ) {

  }

  public watchAll(sites:Sites):Observable<MicroLocalisation[]>{
    return forkJoin(
      this.scanNfc(sites),
      interval(4000).pipe(t=> {return this.scanWifi(sites)})
    ).pipe(
      map(
        res => {
          console.log(res);
          return(res);
        }
      )
    )
  }

  scanNfc(sites : Sites): Observable<MicroLocalisation>{
    console.log('scanNFC started')
    return this.nfc.addNdefListener().pipe(
      map(data => {
        let tagId = this.nfc.bytesToHexString(data.tag.id);
        let site = sites.getSiteFromScannedNFC(tagId);
        this.sitesService.setSite(site.id);
        let tagZone = [site.map.getZoneFromScannedNFCTag(tagId)];
        return new MicroLocalisation(site,tagZone);
      })
    );
  }

  
  scanWifi(sites : Sites): Observable<MicroLocalisation>{
    console.log('scanWifi started')
    const scanWifi = from(this.hotspot.scanWifi());
    return scanWifi.pipe(
      map(networks => {
        networks = networks.sort((a,b)=> a.level - b.level);
        let site = sites.getSiteFromScannedWifi(networks);
        console.log(site.map.getZonesFromScannedWifi(networks));
        return new MicroLocalisation(site,site.map.getZonesFromScannedWifi(networks));
      })
    );
  };
}