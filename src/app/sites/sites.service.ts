import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

import { Site } from '../core/models/site.model';

@Injectable({
  providedIn: 'root'
})
export class SitesService {

  constructor(private http: HttpClient) {}

  public getSites(): Observable<Site[]> {
    return this.http.get('./assets/data/sites.json').pipe(
      map((sites: Site[]) => sites.map(
        (site: Site) => new Site().deserialize(site)
      )
      )
    );
  }

  getSite(id: string) {
    return this.getSites().pipe(take(1), map(sites => {
      return sites.find(site => site.id === id);
    }));
  }
}
