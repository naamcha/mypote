import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NFC } from '@ionic-native/nfc/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { Hotspot, HotspotNetwork } from '@ionic-native/hotspot/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx'

import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';

import { AuthService } from './auth/auth.service';
// import { IBeacon } from '@ionic-native/IBeacon/ngx';
import { SitesItceService } from 'src/services/sites-itce.service';
import { Site } from './core/models/site.model';
import { Coordinate } from 'tsgeo/Coordinate';
import { Sites } from './core/models/sites.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router,
    private storage: Storage,
    private toast: Toast,
    // private ibeacon: IBeacon,
    private nfc: NFC,
    private hotspot: Hotspot,
    private siteItceService: SitesItceService,
    private geolocation: Geolocation
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // this.initBeacon();
      this.initNfc();
      this.scanWifi();
      this.geolocation.getCurrentPosition().then((resp) => {
        // let coordinate1 = new Coordinate(resp.coords.latitude, resp.coords.longitude);
        let coordinate1 = new Coordinate(43.325608, 5.445956);
        this.siteItceService.getSites().subscribe(
          (sites : Sites) => {
            console.log(sites.getNearestSite(coordinate1))
          }
        )
      }).catch((error) => {
        console.log('Error getting location', error);
        let coordinate1 = new Coordinate(43.325608, 5.445956);
        this.siteItceService.getSites().subscribe(
          (sites : Sites) => {
            console.log('nearest',sites.getNearestSite(coordinate1))
          }
        )
      });
       
       let watch = this.geolocation.watchPosition();
       watch.subscribe((data) => {
        // data can be a set of coordinates, or an error (if an error occurred).
        // data.coords.latitude
        // data.coords.longitude
       });
    });  
  }

  initNfc(): void{
    this.nfc.addTagDiscoveredListener(nfcEvent =>
      this.sesReadNFC(nfcEvent)).subscribe(data => {
        // vérifier le site
        console.log('nfc data', data);
        this.siteItceService.getSites().subscribe(sites=>{
          console.log('nearestNfc',sites.getSiteFromScannedNFC(data.tag));
        });
        this.storage.get('searchType').then(searchType => {
          if (searchType) {
            this.storage.get('searchIdentifier').then(searchIdentifier => {
              if (searchIdentifier) {
                // this.navCtrl.setRoot(MyPoteInfoPage,searchIdentifier);
              } else {
                // this.navCtrl.setRoot(EtreGuidVersPage,searchType);
              }
            });
          } else {
            this.router.navigateByUrl('/sites/tabs/sites');
          }
        });
      });
  }

  
  scanWifi(): void{ 
    this.hotspot.scanWifi().then((networks: HotspotNetwork[]) => {
      console.log(networks);
      this.siteItceService.getSites().subscribe(
        (sites : Sites) => {
          console.log(sites.getSiteFromScannedWifi(networks))
        }
      )
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