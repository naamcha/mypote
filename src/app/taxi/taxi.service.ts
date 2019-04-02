import { Injectable } from '@angular/core';
import * as sitesData from '../../assets/data/sites.json';
import { Taxi } from '../core/models/taxi.model';
import { Site } from '../core/models/site.model';
import { Sites } from '../core/models/sites.model';

@Injectable({
  providedIn: 'root'
})
export class TaxiService {

  constructor() { }

    // récupère le json et le transforme en objet
   public getSites(): Sites {
    return new Sites().deserialize(sitesData.sites);
 }
  // recherche au sein de l'objet le site comportant l'id voulu
  public getSite(id): Site {
  return this.getSites().sites.find(site => site.id === id);
  }
   // créer un objet taxi 
   public getTaxi(id):Taxi{
   
  return this.getSites().sites.find(site=> site.id === id).taxi;
  }
}
