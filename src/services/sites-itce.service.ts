import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DSite } from '../app/core/models/d-site.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SitesItceService {
  constructor(private http: HttpClient) {
  }

  public getSites(): Observable<any[]> {
    return this.http.get('./assets/itceInfo/sitesITCE.json').pipe(
      map((sites: DSite[]) => sites.map(
        (site: DSite) => site
        )
      )
    );
  }
}
