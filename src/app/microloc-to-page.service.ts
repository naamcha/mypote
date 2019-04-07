import { Injectable } from '@angular/core';
import { MicroLocalisation } from './core/models/microlocalisation.model';
import * as mapping from '../assets/data/locToPage.json';

@Injectable({
  providedIn: 'root'
})
export class MicrolocToPageService {

  constructor() { }

  getRouteFromMicroLocalisation(microloc: MicroLocalisation): string {

    let mapMicrolocToRoute = mapping.mapping.find(mapp => {
      console.log("-------------------------")
      console.log('siteId', mapp.siteId, microloc.site.id);
      console.log('quarter', mapp.quarterId,((microloc.quarter)?microloc.quarter.id:null));
      console.log('zone', mapp.zoneId, ((microloc.zone)?microloc.zone.id:null));
      if(mapp.siteId === microloc.site.id
        && mapp.quarterId === ((microloc.quarter)?microloc.quarter.id:null)
        && mapp.zoneId === ((microloc.zone)?microloc.zone.id:null)){
          console.log('------MATCHED------')
        }
      return (mapp.siteId === microloc.site.id
        && mapp.quarterId === ((microloc.quarter)?microloc.quarter.id:null)
        && mapp.zoneId === ((microloc.zone)?microloc.zone.id:null))
    });

    console.log('getRouteFromMicroLocalisation',mapMicrolocToRoute)
    if(mapMicrolocToRoute) return mapMicrolocToRoute.route;
    else return undefined;
  };
}