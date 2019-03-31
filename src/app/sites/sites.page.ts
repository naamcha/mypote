import { Component, OnInit } from '@angular/core';

import { SitesService } from './sites.service';
import { Site } from '../core/models/site.model';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.page.html',
  styleUrls: ['./sites.page.scss'],
})
export class SitesPage implements OnInit {
  sites: Site[];

  constructor(
    private sitesService: SitesService
  ) { }

  ngOnInit() {
    this.sites = this.sitesService.getSites().sites;
  }

}
