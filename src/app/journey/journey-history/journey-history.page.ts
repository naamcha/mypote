import { Component, OnInit } from '@angular/core';
import { JourneyService } from '../journey.service';
import { MicrolocLight } from 'src/app/core/models/microlocalisation.model';
import { SitesService } from 'src/app/sites/sites.service';

@Component({
  selector: 'app-journey-history',
  templateUrl: './journey-history.page.html',
  styleUrls: ['./journey-history.page.scss'],
})
export class JourneyHistoryPage implements OnInit {
  journey: any;
  site: import("d:/CODE/myNewPote/mypote/src/app/core/models/site.model").Site;
  constructor(private journeyService: JourneyService, private siteService: SitesService) { }

  ngOnInit() {
    this.journeyService.navHistory.subscribe(navhist => {
      this.site = this.siteService.getSite(this.siteService.currentSiteId);
      this.journey = this.journeyService.journeyFromMicrolightToMicroloc(navhist, this.site);
    });
  }

}
