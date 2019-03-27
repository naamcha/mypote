import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SitesService {

  constructor(private http: HttpClient) {}

  public getSites(): Observable<any> {
    return this.http.get('./assets/data/sites.json');
  }

  getSite(id: string) {
    return this.getSites().pipe(take(1), map(sites => {
      return sites.find(site => site.id === id);
    }));
  }
}
