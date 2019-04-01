import { Component, OnInit } from '@angular/core';
import { SitesService } from '../../sites/sites.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.page.html',
  styleUrls: ['./room.page.scss'],
})
export class RoomPage implements OnInit {
  activeSite;

  constructor(
    private sitesService: SitesService
  ) { }

  ngOnInit() {
    this.sitesService.currentSiteId.subscribe(site => {
      this.activeSite = this.sitesService.getSite(site);
    });
  }

}
