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
    this.taxis = this.TaxiService.getSite(id).taxi;
    
 }

}