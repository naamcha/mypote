import { Component, OnInit } from '@angular/core';
import { SitesService } from '../sites/sites.service';
import { Site } from '../core/models/site.model';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.page.html',
  styleUrls: ['./travel.page.scss'],
})
export class TravelPage implements OnInit {
  activeSite: Site;

  constructor(
    private sitesService: SitesService
  ) { }

  ngOnInit() {
    this.sitesService.currentSiteId.subscribe(site => {
      this.activeSite = this.sitesService.getSite(site);
    });
  }

  onNavigateTo() {
    this.sitesService.navigateTo(this.activeSite);
  }

}
