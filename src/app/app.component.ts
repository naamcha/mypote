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
import { MicrolocToPageService } from './microloc-to-page.service';
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
    private microlocToPage: MicrolocToPageService,
    private router: Router,
    private navCtrl: NavController) {
    this.initializeApp();
  }
  ngOnInit(){
    this.sitesService.currentSiteId.subscribe(siteId => {
      console.log('ngOnInit',siteId)
      this.activeSite = this.sitesService.getSite(siteId);
      console.log('ngOnInit',this.activeSite)

    });

  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
      console.log("wtart getSites")
      let sites = this.sitesService.getSites();
      console.log("end getSites")
      this.microLocalisationService.watchAll(sites);
      console.log("end watchAll")
      this.microLocalisationService.microlocation.subscribe(changeFired => {
        console.log('changeFired ==> ',changeFired)   
        if(changeFired !== undefined){
          console.log('check microloc to microlight conv', changeFired.toMicrolight())
          let checkpoint = changeFired.toMicrolight();
          this.journeyService.pushCheckPoint(checkpoint);
          let segment = this.journeyService.walkNav(checkpoint);
          if(segment){
            let routerPath = segment.segmentRouterPath;
            console.log('segment',routerPath);
            this.router.navigateByUrl(routerPath);
          }else{
            let routerPath = this.microlocToPage.getRouteFromMicroLocalisation(changeFired)
            console.log('point',routerPath);
            this.router.navigateByUrl(routerPath);
          }
        }
      });
    });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }
}

