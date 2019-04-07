import { Component, OnInit } from '@angular/core';
import { JourneyService } from '../journey/journey.service';

@Component({
  selector: 'app-journey-history',
  templateUrl: './journey-history.page.html',
  styleUrls: ['./journey-history.page.scss'],
})
export class JourneyHistoryPage implements OnInit {
  journey: any;

  constructor(private journeyService : JourneyService) { }

  ngOnInit() {
    this.journey = this.journeyService.getCheckPoints();
  }

}
