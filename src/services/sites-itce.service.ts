import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';

import { DSite } from '../app/core/models/d-site.model';


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
