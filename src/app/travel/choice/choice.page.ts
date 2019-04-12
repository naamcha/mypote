import { Component, OnInit } from '@angular/core';
import { SitesService } from 'src/app/sites/sites.service';
import { Site } from 'src/app/core/models/site.model';

@Component({
  selector: 'app-choice',
  templateUrl: './choice.page.html',
  styleUrls: ['./choice.page.scss'],
})
export class ChoicePage implements OnInit {
  activeSite: Site;
  interests: [];

  constructor(
    private sitesService: SitesService
  ) { }

  ngOnInit() {
    this.sitesService.currentSiteId.subscribe(site => {
      this.activeSite = this.sitesService.getSite(site);
    });

    this.interests = this.activeSite.interest;
    
  }

}


