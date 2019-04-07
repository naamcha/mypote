import { Component, OnInit } from '@angular/core';
import { SitesService } from '../../sites/sites.service';
import { Site } from '../../core/models/site.model';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.page.html',
  styleUrls: ['./parking.page.scss'],
})
export class ParkingPage implements OnInit {
  site: Site;

  constructor(
    private sitesService: SitesService
  ) { }

  ngOnInit() {
    this.sitesService.currentSiteId.subscribe(id => {
      this.site = this.sitesService.getSite(id);
    });
  }

}
