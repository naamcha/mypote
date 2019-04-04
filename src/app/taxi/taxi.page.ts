// import { Component, OnInit } from '@angular/core';
// import * as sitesData from '../../assets/data/sites.json';
// import { TaxiService } from './taxi.service';
// import { Site } from '../core/models/site.model';
// import { ActivatedRoute } from '@angular/router';
// import { Taxi } from '../core/models/taxi.model';
// import { Sites } from '../core/models/sites.model.js';
// @Component({
//   selector: 'app-taxi',
//   templateUrl: './taxi.page.html',
//   styleUrls: ['./taxi.page.scss'],
// })
// export class TaxiPage implements OnInit {
//   taxis: Site ;

//   constructor( private TaxiService: TaxiService, private route: ActivatedRoute) { }

//   ngOnInit() {
//    const id= this.route.snapshot.params['id'];
//    console.log(id);
//    console.log(sitesData.sites);

//   console.log(new Sites().deserialize(sitesData.sites));
//   // créer un tableau taxi à partir de l'objet site récupérer via la fonction getsite
//     this.taxis = this.TaxiService.getSite(+id);
//     console.log(this.taxis);
//   }

// }
import { Component, OnInit } from '@angular/core';
import * as sitesData from '../../assets/data/sites.json';
import { TaxiService } from './taxi.service';
import { Site } from '../core/models/site.model';
import { ActivatedRoute } from '@angular/router';
import { Taxi } from '../core/models/taxi.model';
import { Sites } from '../core/models/sites.model.js';
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
    console.log("Get site: ");
    console.log(this.taxis);
  //   console.log("Get taxi of site: ");
  //   console.log(this.taxis.taxi);
 }

}