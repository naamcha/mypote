import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Platform, NavController } from '@ionic/angular';

import { AuthService } from './auth/auth.service';
import { SitesService } from './sites/sites.service';
import { JourneyService } from './journey/journey.service';
import { MicroLocalisationService } from './micro-localisation.service';
import { Site, Zone } from './core/models/site.model';
import { Hotspot } from '@ionic-native/hotspot/ngx';
// import { Coordinate } from 'tsgeo/Coordinate';
// import { IBeacon } from '@ionic-native/IBeacon/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  activeSite: Site;
  wifiScannedZone;
  networks: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private sitesService: SitesService,
    private journeyService: JourneyService,
    private microLocalisationService: MicroLocalisationService,
    private router: Router,
    private navCtrl: NavController) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.sitesService.currentSiteId.subscribe(siteId => {
        this.activeSite = this.sitesService.getSite(siteId);
      });

      let sites = this.sitesService.getSites();
      this.microLocalisationService.watchAll(sites);
      this.microLocalisationService.microlocation.subscribe(changeFired => {
        console.log('changeFired',changeFired)
        if(changeFired){
          // this.routeToZone(changeFired.)
        }
      });
    });
  }


  routeToZone(zone: Zone): void {
    this.router.initialNavigation();
    this.navCtrl.navigateRoot('home');
    this.journeyService.pushCheckPoint(zone);
    this.router.navigateByUrl(zone.navRouting);
  }


  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }
}

