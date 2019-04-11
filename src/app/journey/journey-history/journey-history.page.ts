import { Component, OnInit } from '@angular/core';
import { JourneyService } from '../journey.service';
import { MicrolocLight, MicroLocalisation } from 'src/app/core/models/microlocalisation.model';
import { SitesService } from 'src/app/sites/sites.service';
import { Site } from 'src/app/core/models/site.model';

@Component({
  selector: 'app-journey-history',
  templateUrl: './journey-history.page.html',
  styleUrls: ['./journey-history.page.scss'],
})
export class JourneyHistoryPage implements OnInit {
  journey: MicrolocLight[];
  site: Site;
  constructor(private journeyService: JourneyService, private siteService: SitesService) { }

  ngOnInit() {
    this.journeyService.navHistory.subscribe(navhist => {
      if(navhist[0]!==undefined){
        this.site = this.siteService.getSite(navhist[0].siteId);
        this.journey = navhist;
      }
    });
  }
}
