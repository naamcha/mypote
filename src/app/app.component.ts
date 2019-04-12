import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Platform, NavController, AlertController } from '@ionic/angular';

import { AuthService } from './auth/auth.service';
import { SitesService } from './sites/sites.service';
import { JourneyService } from './journey/journey.service';
import { MicroLocalisationService } from './micro-localisation.service';
import { Site } from './core/models/site.model';
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
    private alertController: AlertController,
    private router: Router) {
    this.initializeApp();
  }
  ngOnInit() {
    this.sitesService.currentSiteId.subscribe(siteId => {
      console.log('ngOnInit siteId', siteId);
      this.activeSite = this.sitesService.getSite(siteId);
      console.log('ngOnInit this.activeSite', this.activeSite)
    });

  }
  initializeApp() {
    console.log("initialize App")
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      let sites = this.sitesService.getSites();
      this.microLocalisationService.watchAll(sites);
      this.microLocalisationService.microlocation.subscribe(newMicroloc => {
        if (newMicroloc !== undefined) {
          let checkpoint = newMicroloc.toMicrolight();
          this.journeyService.pushCheckPoint(checkpoint);
          console.log('app.component ',checkpoint,this.journeyService.currentNavSegments)
          let segment = this.journeyService.refreshNav(checkpoint);
          if (!segment) {
            let routerPath = this.microlocToPage.getRouteFromMicroLocalisation(newMicroloc)
            console.log('point', routerPath);
            this.router.navigateByUrl(routerPath);
          }
        }
      });

      this.journeyService.navSegment.subscribe(navSeg => {
        console.log('segment0', navSeg);
        if (navSeg) {
          let routerPath = navSeg.segmentRouterPath;
          console.log('segment--------->', routerPath);
          this.router.navigateByUrl(routerPath);
        }
      });
    });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }

  async presentAlertMultipleButtons(site: Site) {
    this.alertController.create({
      header: 'Etes-vous au bon endroit ?',
      subHeader: '',
      message: `Le site de ${site.name} semble plus proche de vous, voulez-vous changer ?`,
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Changer de Site',
          handler: () => {
            console.log('changeSite to ', site.id);
            this.sitesService.setSite(site.id);
          }
        }
      ]
    })
      .then(alert => {
        alert.present();
      });
  }
}

