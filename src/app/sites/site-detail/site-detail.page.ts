import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { SitesService } from '../sites.service';
import { Coordinate } from 'tsgeo/Coordinate';
import { Geolocation } from '@ionic-native/geolocation/ngx'
import { Site } from '../../core/models/site.model';

@Component({
  selector: 'app-site-detail',
  templateUrl: './site-detail.page.html',
  styleUrls: ['./site-detail.page.scss'],
})
export class SiteDetailPage implements OnInit, OnDestroy {
  site: Site;
  distanceToSite: number;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private sitesService: SitesService,
    private router: Router,
    private geolocation : Geolocation,
    private platform: Platform
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('siteId')) {
        this.navCtrl.navigateBack('/sites');
        return;
      }
      this.site = this.sitesService.getSite(paramMap.get('siteId'));
      this.watchDistanceToSite();
    })
  }

  onSetSite(site) {
    this.sitesService.setSite(site);
    this.router.navigateByUrl('/tabs/tab-bar/home');
  }

  navigateTo(position) {
    // console.log(`navigateTo`, position.lat, position.lng);
    const latitude = this.site.position.lat;
    const longitude = this.site.position.lng;
    let destination = latitude + ',' + longitude;

    if (this.platform.is('ios')) {
      window.open('maps://?q=' + destination, '_system');
    } else {
      let label = encodeURI('site de ' + this.site.name);
      window.open('geo:0,0?q=' + destination,  + '(' + label + ')', '_system');
    }
  }

  watchDistanceToSite(): void{
    this.distanceToSite = 0;
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      console.log(data);
      this.distanceToSite = this.site.getDistanceToSite(new Coordinate(data.coords.latitude,data.coords.longitude));
    });
  }

  ngOnDestroy(): void { }

}
