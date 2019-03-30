import { Injectable } from '@angular/core';

import * as sitesData from '../../assets/data/sites.json';
import { Site } from '../core/models/site.model';

@Injectable({
  providedIn: 'root'
})
export class SitesService {
  constructor() {}

  public getSites(): Site[] {
    return sitesData.sites;
  }

  public getSite(id): Site {
    return this.getSites().find(site => site.id === id);
  }
}
