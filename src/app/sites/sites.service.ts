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
      take(1),
      map(response => {
        return response['sites'];
      })
    );
  }

  getSite(id: string): Observable<Site> {
    return this.getSites().pipe(
      take(1),
      map((sites: Site[]) => {
        return sites.find((site: Site) => site.id === id);
      })
    );
  }
}
