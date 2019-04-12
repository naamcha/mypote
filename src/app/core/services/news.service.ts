import { Injectable } from '@angular/core';

import * as newsData from '../../../assets/data/news.json';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor() { }

  getSiteNews() {
    return newsData.site;
  }

  getCompanyNews() {
    return newsData.itce;
  }
}
