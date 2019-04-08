import { Site, Zone, Quarter } from './site.model';
import { Deserializable } from './deserializable.model';

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

  toMicrolight(){
    return new MicrolocLight().deserialize({"siteId": this.site.id, "quarterId": this.quarter.id,"zoneId": this.zone.id})
  }
}
export class MicrolocLight implements Deserializable{
  public siteId;
  public quarterId;
  public zoneId;
  
  deserialize(input: any): this {
      Object.assign(this, input);
      return this;
  }
}