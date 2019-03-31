import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

import { SitesItceService } from '../../services/sites-itce.service'
import { Site } from '../core/models/site.model';

@Component({
  selector: 'app-to-site',
  templateUrl: './to-site.page.html',
  styleUrls: ['./to-site.page.scss'],
})
export class ToSitePage implements OnInit {
  sites: any[];

  constructor(
    private router: Router, 
    private serv: SitesItceService,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.storage.set('siteId',null);
    // this.serv.getSites().subscribe((sites: Site[]) => {
    //   console.log('sites', sites);
    //   this.sites = sites;
    // });
  }

}
