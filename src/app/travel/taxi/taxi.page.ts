import { Component, OnInit } from '@angular/core';

import { TaxiService } from './taxi.service';

import { ActivatedRoute } from '@angular/router';
import { SitesService } from 'src/app/sites/sites.service';

@Component({
  selector: 'app-taxi',
  templateUrl: './taxi.page.html',
  styleUrls: ['./taxi.page.scss'],
})
export class TaxiPage implements OnInit {
  taxis: [];

  constructor(private siteService: SitesService, private TaxiService: TaxiService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    // créer un tableau taxi à partir de l'objet site récupérer via la fonction getsite
    this.taxis = this.siteService.getSite(id).taxi

  }

  goTo(latitude, longitude, name,address) {
    //on récupère les variables
    const url1 = "https://m.uber.com/ul/?action=setPickup&pickup[latitude]=my_location&pickup[longitude]=my_location&pickup[nickname]=my_location&dropoff[latitude]=";
    const url2 = "&dropoff[longitude]=";
    const url3 = "&dropoff[nickname]=";
    const url4 = "&dropoff[formatted_address]=";
    //const url1=this.TaxiService.getSite(id).taxi.find(idtaxi === idtaxi).url1;
    // on récupère les différentes urls depuis la page html et on crée des variables
    const url = url1 + latitude + url2 + longitude + url3 + name + url4 + address;
    window.open(url, '_system');
  }
 
  //fonction ouvrant l'appli uber pour rejoindre un lieu 
  goToSomewhere(event) {
    
    const latitude = this.route.snapshot.params['lat'];
    const longitude = this.route.snapshot.params['lon'];
    const name = this.route.snapshot.params['name'];
    const address ='';
    this.goTo(latitude, longitude,name, address);
  }

}