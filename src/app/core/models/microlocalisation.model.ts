import { Site, Zone, Quarter } from './site.model';
import { Deserializable } from './deserializable.model';

export class MicroLocalisation {
  public site: Site;
  public quarter: Quarter;
  public zone: Zone;
  public distanceToSite: number;


  constructor(site: Site, quarter: Quarter, zone: Zone, distanceToSite: number) {
    this.quarter = quarter;
    this.zone = zone;
    this.site = site;
    this.distanceToSite = distanceToSite;
  }

  toMicrolight() {
    console.log('',this.site,this.quarter,this.zone);
    return new MicrolocLight().deserialize({ 
      "siteId": (this.site!==undefined)?this.site.id:undefined, 
      "quarterId": (this.quarter!==undefined)?this.quarter.id:undefined, 
      "zoneId": (this.zone!==undefined)? this.zone.id:undefined
    })
  }
}
export class MicrolocLight implements Deserializable {
  public siteId;
  public quarterId;
  public zoneId;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}