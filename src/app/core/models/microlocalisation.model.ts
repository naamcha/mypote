import { Site, Zone } from './site.model';

export class MicroLocalisation {
  public site:Site;
  public zones:Zone[]; 

  constructor(site:Site, zones:Zone[]){
    this.zones = zones;
    this.site = site;
  }
}
