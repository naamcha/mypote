import { Component, OnInit } from '@angular/core';

import { SitesService } from './sites.service';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.page.html',
  styleUrls: ['./sites.page.scss'],
})
export class SitesPage implements OnInit {
  sites;

  constructor(
    private sitesService: SitesService
  ) { }

  ngOnInit() {
    this.sitesService
    .getSites()
    .subscribe(sites => this.sites = sites)
  }

}
