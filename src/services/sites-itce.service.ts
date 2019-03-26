import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs/Observable';

import { Site } from '../app/core/models/site.model';
import { map } from "rxjs/operators";


@Injectable()
export class SitesItceService {
  constructor(private http: HttpClient) {
  }

  public getSites(): Observable<any[]> {
    return this.http.get("./assets/itceInfo/sitesITCE.json").pipe(
      map((sites: Site[]) => sites.map(
        (site: Site) => new Site().deserialize(site)
        )
      )
    );
  }
}
