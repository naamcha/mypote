import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { SitesService } from '../sites.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-site-detail',
  templateUrl: './site-detail.page.html',
  styleUrls: ['./site-detail.page.scss'],
})
export class SiteDetailPage implements OnInit, OnDestroy {
  site;
  siteSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private sitesService: SitesService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('siteId')) {
        this.navCtrl.navigateBack('/sites');
        return;
      }
      this.siteSub = this.sitesService
        .getSite(paramMap.get('siteId'))
        .subscribe(site => this.site = site);
    })
  }

  ngOnDestroy(): void {
    if (this.siteSub) {
      this.siteSub.unsubscribe();
    }
  }

}
