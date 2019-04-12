import { Component, OnInit } from '@angular/core';
import { SitesService } from '../sites/sites.service';
import { Site } from '../core/models/site.model';
import { AlertController } from '@ionic/angular';
import { NewsService } from '../core/services/news.service';
import { JourneyService } from '../journey/journey.service';
import { MicroLocalisation } from '../core/models/microlocalisation.model';
import { MicroLocalisationService } from '../micro-localisation.service';

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
  journey: MicroLocalisation[];
  site: any;

  siteNews = [];
  companyNews = [];
  slideOpts = {
    effect: 'flip'
  };

  constructor(
    private sitesService: SitesService,
    private alertController: AlertController,
    private newsService: NewsService,
    private microloc: MicroLocalisationService,
    private journeyService: JourneyService
  ) { }

  ngOnInit() {
    this.sitesService.currentSiteId.subscribe(currentSiteId => {
      this.currentSite = this.sitesService.getSite(currentSiteId);
    });
    // this.microloc.microlocation.subscribe(ml=>{
    //   console.log('init home page',ml);
    //   if(ml.site.id !== this.sitesService.currentSiteId.getValue()) this.presentAlertMultipleButtons(ml.site);
    // })
    this.journeyService.navHistory.subscribe(navhist => {
      this.journey = (navhist)? navhist.map(nav=>nav.toMicroloc(this.currentSite)):undefined;
    });
    this.siteNews = this.newsService.getSiteNews();
    this.companyNews = this.newsService.getCompanyNews();
  }
}
