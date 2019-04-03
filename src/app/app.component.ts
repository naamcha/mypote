import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NFC } from '@ionic-native/nfc/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { Hotspot, HotspotNetwork } from '@ionic-native/hotspot/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx'

import { Storage } from '@ionic/storage';
import { Platform, AlertController } from '@ionic/angular';
import { interval } from 'rxjs';

import { AuthService } from './auth/auth.service';
import { SitesService } from './sites/sites.service';
import { Coordinate } from 'tsgeo/Coordinate';
import { Sites } from './core/models/sites.model';
import { Site } from './core/models/site.model';
// import { IBeacon } from '@ionic-native/IBeacon/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  activeSite: Site;
  wifiScannedZone;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private sitesService: SitesService,
    private router: Router,
    private storage: Storage,
    private toast: Toast,
    private nfc: NFC,
    private hotspot: Hotspot,
    private siteService: SitesService,
    private geolocation: Geolocation
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.sitesService.currentSiteId.subscribe(siteId => {
      this.activeSite = this.sitesService.getSite(siteId);
      console.log('initializeApp', siteId);
      // watch position
      let watch = this.geolocation.watchPosition();
      // watch for known wifi mac address
      interval(3000).subscribe((data) => {
        this.scanWifi();
      });
    });

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // this.initBeacon();
      this.initNfc();
      this.scanWifi();
    });
  }

  initNfc(): void{
    this.nfc.addTagDiscoveredListener( nfcEvent => this.sesReadNFC(nfcEvent))
    .subscribe(data => {
        // vérifier le site
        let sites : Sites = this.siteService.getSites();
        console.log('nearestNfc',data,sites.getSiteFromScannedNFC(data.tag));
        this.sitesService.setSite(sites.getSiteFromScannedNFC(data.tag).id);
        this.router.navigateByUrl('journey/tag1');
    });
  }


  scanWifi(): void{
    this.hotspot.scanWifi().then((networks: HotspotNetwork[]) => {
      console.log(networks);
      this.siteService.currentSiteId.subscribe(siteId => {
        console.log(this.siteService.getSite(siteId));
        let site = this.siteService.getSite(siteId);
        console.log(site.map.getZonesFromScannedWifi(networks));
        this.wifiScannedZone = site.map.getZonesFromScannedWifi(networks)[0];
      })
    });
  }

  sesReadNFC(data): void {
    const toast = this.toast.show(
      'NFC_WORKING',
      '6000',
      'bottom'
      );
      console.log('nfc working', data);
    }

    onLogout() {
      this.authService.logout();
    this.router.navigateByUrl('/auth');
  }
}

/*                       initBeacon(): void{
                        // Request permission to use location on iOS
                        this.ibeacon.requestAlwaysAuthorization().then(info => {
                          console.log('ibeacon initialized',info)
                        });
                        // create a new delegate and register it with the native layer
                        let delegate = this.ibeacon.Delegate();

                        // Subscribe to some of the delegate's event handlers
                        delegate.didRangeBeaconsInRegion()
                          .subscribe(
                            data => console.log('didRangeBeaconsInRegion: ', data),
                            error => console.error()
                          );
                        delegate.didStartMonitoringForRegion()
                          .subscribe(
                            data => console.log('didStartMonitoringForRegion: ', data),
                            error => console.error()
                          );
                        delegate.didEnterRegion()
                          .subscribe(
                            data => {
                              console.log('didEnterRegion: ', data);
                            }
                          );
                      } */
