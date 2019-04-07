import { Component, OnInit } from '@angular/core';

import { TaxiService } from './taxi.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-taxi',
  templateUrl: './taxi.page.html',
  styleUrls: ['./taxi.page.scss'],
})
export class TaxiPage implements OnInit {
  taxis: [];

  constructor( private TaxiService: TaxiService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id= this.route.snapshot.params['id'];

    // créer un tableau taxi à partir de l'objet site récupérer via la fonction getsite
    // this.taxis = this.TaxiService.getSite(id).taxi;
    
 }
//  fonction ouvrant l'appli voulu 
 redirectTo(event){
  const id= this.route.snapshot.params['id'];
  //  const latitude=this.TaxiService.getSite(id).position.lat;
  //  const longitude=this.TaxiService.getSite(id).position.lng; 

   //on récupère les variables
   const url1= "https://m.uber.com/ul/?action=setPickup&pickup[latitude]=my_location&pickup[longitude]=my_location&pickup[nickname]=my_location&dropoff[latitude]=";
   const url2= "&dropoff[longitude]=";
   const url3="&dropoff[nickname]=ITCE/";
   //const url1=this.TaxiService.getSite(id).taxi.find(idtaxi === idtaxi).url1;
    // on récupère les différentes urls depuis la page html et on crée des variables
   console.log(url1);
  //  const url= url1+ latitude + url2 + longitude + url3;
  //  window.open(url,'_system');
 }

}