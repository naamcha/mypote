import { Site, Zone, Quarter } from './site.model';

export class MicroLocalisation {
  public site:Site;
  public quarter: Quarter;
  public zone:Zone; 
  public distanceToSite: number;


  constructor(site:Site, quarter:Quarter, zone:Zone, distanceToSite:number){
    this.quarter = quarter;
    this.zone = zone;
    this.site = site;
    this.distanceToSite = distanceToSite;
  }
}
