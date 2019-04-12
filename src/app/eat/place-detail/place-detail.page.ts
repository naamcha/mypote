import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import * as placesData from '../../../assets/data/places.json';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  places;
  place;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.places = placesData.places;

    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/tabs/tab-bar/eat/places');
        return;
      } else {
        this.place = this.places.find(place => place['id'].toString() === paramMap.get('placeId'));
      }
    });
  }

}
