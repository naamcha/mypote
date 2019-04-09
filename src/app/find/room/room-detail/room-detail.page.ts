import { Component, OnInit } from '@angular/core';
import { SitesService } from '../../../sites/sites.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Site } from '../../../core/models/site.model';
import { JourneyService } from 'src/app/journey/journey.service';
import { MicrolocLight } from 'src/app/core/models/microlocalisation.model';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.page.html',
  styleUrls: ['./room-detail.page.scss'],
})
export class RoomDetailPage implements OnInit {
  site: Site;
  room;
  cat = 'details';

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private sitesService: SitesService,
    private journeyService : JourneyService
  ) { }

  
  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('roomId')) {
        this.navCtrl.navigateBack('/tabs/tab-bar/room');
        return;
      } else {
        this.sitesService.currentSiteId.subscribe(siteId => {
          this.site = this.sitesService.getSite(siteId);
          this.room = this.site.rooms.find(room => room['id'] === +paramMap.get('roomId'));
        });
      }
    })
  }
  
  startNav() {
    this.journeyService.startNav(new MicrolocLight().deserialize(this.room.microlocation));
  }
}
