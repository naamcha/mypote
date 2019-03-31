import { Injectable } from '@angular/core';

import * as sitesData from '../../assets/data/sites.json';
import { Site } from '../core/models/site.model';
import { BehaviorSubject } from 'rxjs';
import { Sites } from '../core/models/sites.model.js';

@Injectable({
  providedIn: 'root'
})
export class SitesService {

  constructor(private sites:Sites) {}

  public getSites(): Sites {
    return new Sites().deserialize(sitesData);
  }

  public getSite(id): Site {
    return this.getSites().sites.find(site => site.id === id);
  }
}
