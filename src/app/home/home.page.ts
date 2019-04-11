import { Component, OnInit } from '@angular/core';
import { SitesService } from '../sites/sites.service';
import { Site } from '../core/models/site.model';
import { Geolocation } from '@ionic-native/geolocation/ngx'
import { Coordinate } from 'tsgeo/Coordinate';
import { AlertController } from '@ionic/angular';
import { NewsService } from '../core/services/news.service';
import { JourneyService } from '../journey/journey.service';
import { MicrolocLight, MicroLocalisation } from '../core/models/microlocalisation.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  // closed = false;
  currentSite: Site;
  distanceToSite: number;
  proposedOnce: any;
  journey: MicrolocLight[];
  site: any;

  siteNews = [];
  companyNews = [];
  slideOpts = {
    effect: 'flip'
  };

  constructor(
    private sitesService: SitesService,
    private geolocation: Geolocation,
    private alertController: AlertController,
    private newsService: NewsService,
    private journeyService: JourneyService
  ) { }

  ngOnInit() {
    this.sitesService.currentSiteId.subscribe(currentSiteId => {
      this.currentSite = this.sitesService.getSite(currentSiteId);
    });
    this.journeyService.navHistory.subscribe(navhist => {
      this.journey = navhist;
    });
    this.siteNews = this.newsService.getSiteNews();
    this.companyNews = this.newsService.getCompanyNews();
  }

  watchDistanceToSite(site: Site): void {
    this.distanceToSite = 0;
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      let currentCoordinate = new Coordinate(data.coords.latitude, data.coords.longitude);
      this.distanceToSite = site.getDistanceToSite(currentCoordinate);
      console.log(this.distanceToSite)
      let nearestSite = this.sitesService.getSites().getNearestSite(currentCoordinate);
      if (this.currentSite !== nearestSite && this.proposedOnce !== true) {
        this.presentAlertMultipleButtons(nearestSite).then(
          () => {
            this.proposedOnce = true;
          },
          error => {
            console.log(`error`, error);
          }
        );
      }
    });
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
            this.proposedOnce = true;
          }
        },
        {
          text: 'Changer de Site',
          handler: () => {
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
