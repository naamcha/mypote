import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';
import { SitesService } from '../sites/sites.service';
import { Site } from '../core/models/site.model';
import { Geolocation } from '@ionic-native/geolocation/ngx'
import { Coordinate } from 'tsgeo/Coordinate';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  animations: [
    trigger('fadeOut', [
      transition(':enter', [
        style({ opacity: 1, transform: 'translateY(0)' }),
      ]),
      transition(':leave', [
        animate('.2s', style({ opacity: 0, marginTop: '-120px', display: 'none' }))
      ])
    ])
  ]
})
export class HomePage implements OnInit {
  closed = false;
  activeSite: Site;
  distanceToSite: number;
  proposedOnce: any;

  constructor(
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private sitesService: SitesService,
    private geolocation : Geolocation,
    private alertController : AlertController
  ) { }

  ngOnInit() {
    this.sitesService.currentSiteId.subscribe(site => {
      this.activeSite = this.sitesService.getSite(site);
      this.watchDistanceToSite(this.activeSite);
    });
  }

  postpone(el: IonItemSliding) {
    this.closeSlidingElement(el);
  }

  cancelReminder(el: IonItemSliding) {
    this.closeSlidingElement(el);
  }

  closeSlidingElement(element): void {
    element.closeOpened();
    this.closed = true;
  }


  watchDistanceToSite(site:Site): void{
    this.distanceToSite = 0;
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      console.log('watchPosition', data);
      let currentCoordinate = new Coordinate(data.coords.latitude,data.coords.longitude);
      this.distanceToSite = site.getDistanceToSite(currentCoordinate);
      console.log(this.distanceToSite)
      let nearestSite = this.sitesService.getSites().getNearestSite(currentCoordinate);
      if (this.activeSite !== nearestSite && this.proposedOnce !== true) {
        this.presentAlertMultipleButtons(nearestSite).then(
          success => {
            this.proposedOnce = true;
          },
          error => {
            console.log(`error`, error);
          }
        );
      }
    });
  }

  async presentAlertMultipleButtons(site:Site) {
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
