import { Component, OnInit } from '@angular/core';
import * as placesData from '../../../assets/data/places.json';

@Component({
  selector: 'app-places',
  templateUrl: './places.page.html',
  styleUrls: ['./places.page.scss'],
})
export class PlacesPage implements OnInit {
  places;

  constructor() { }

  ngOnInit() {
    this.places = placesData.places;
  }

}
