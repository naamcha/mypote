import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';

import { Site } from '../app/core/models/site.model';
import { map, mergeMap } from 'rxjs/operators';
import { Coordinate } from 'tsgeo/Coordinate';
import { Sites } from 'src/app/core/models/sites.model';


@Injectable({
  providedIn: 'root'
})
export class SitesItceService {
  constructor(private http: HttpClient, private storage: Storage) {
  }

  public getSites(): Observable<Sites> {
    return this.http.get('./assets/data/sites.json').pipe(
      map(
        (jsonArray: Object[]) => new Sites().deserialize(jsonArray)
      )
    );
  }

  // Boolean functions

  // Search functions



}
