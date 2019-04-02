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

  public getSites(): Sites {
    return new Sites().deserialize(sitesData.sites);
  }

  public getSite(id): Site {
    return this.getSites().sites.find(site => site.id === id);
  }

  // public getTaxi(id):Taxi{
   
  // return 
  // }
}
