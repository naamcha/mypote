import { Site, Zone } from './site.model';

export class MicroLocalisation {
  public site:Site;
  public zones:Zone[]; 
  public distanceToSite: number;


  constructor(site:Site, zones:Zone[], distanceToSite:number){
    this.zones = zones;
    this.site = site;
    this.distanceToSite = distanceToSite;
  }
}
