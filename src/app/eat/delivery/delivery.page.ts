import { Component, OnInit } from '@angular/core';
import * as placesData from '../../../assets/data/places.json';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.page.html',
  styleUrls: ['./delivery.page.scss'],
})
export class DeliveryPage implements OnInit {
  places;

  constructor() { }

  ngOnInit() {
    this.places = placesData.places.filter(place => place.delivery === true);
  }

}
