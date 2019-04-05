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
import { MicroLocalisation } from './core/models/microlocalisation.model';
import { from } from 'rxjs';
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
    private navCtrl: NavController,
    private hotspot: Hotspot
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
/*       this.sitesService.currentSiteId.subscribe(siteId => {
        this.activeSite = this.sitesService.getSite(siteId);
        console.log('initializeApp', siteId);
      }); */
      // const scanWifi = from(this.hotspot.startWifiPeriodicallyScan(3000,30));
      // scanWifi.then(res => console.log('scanWifi',res));
      let sites = this.sitesService.getSites();
      this.microLocalisationService.watchAll(sites);

      // this.microLocalisationService.scanNfc(sites).subscribe((microlocation: MicroLocalisation) => {
      //   console.log(microlocation);
      // },
      // error =>{
      //   console.log(error)
      // })
    });
  }

  
  routeToZone(zone:Zone):void{
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

