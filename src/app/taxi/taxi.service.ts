import { Injectable } from '@angular/core';
import * as sitesData from '../../assets/data/sites.json';
import { Taxi } from '../core/models/taxi.model';
import { SitesService } from '../sites/sites.service';

@Injectable({
  providedIn: 'root'
})
export class TaxiService {

  constructor() { }

  getTaxi(id):Taxi{
    
  }
}
