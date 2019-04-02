import { Component, OnInit } from '@angular/core';

import { TaxiService } from './taxi.service';
import { Site } from '../core/models/site.model';
import {Taxi } from '../core/models/taxi.model'
import { NavParams } from '@ionic/angular';
@Component({
  selector: 'app-taxi',
  templateUrl: './taxi.page.html',
  styleUrls: ['./taxi.page.scss'],
})
export class TaxiPage implements OnInit {
  taxis :Taxi[];

  constructor( private TaxiService: TaxiService) { }

  ngOnInit() {
  
    //this.taxis = this.TaxiService.getTaxi(this.navParams.get('userParams'));
  }

}
