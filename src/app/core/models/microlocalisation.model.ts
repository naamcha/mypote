import { Site, Zone,  Quarter } from './site.model';
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

  toMicrolight() :MicrolocLight{
    console.log('toMicrolight 0', this);
    let siteId = (this.site !== undefined) ? this.site.id : null;
    let quarterId = (this.quarter !== undefined) ? this.quarter.id : null;
    let zoneId = (this.zone !== undefined) ? this.zone.id : null;
    const micrlight = new MicrolocLight().deserialize({siteId, quarterId, zoneId});
    console.log('toMicrolight 1', micrlight);
    return micrlight;
  }

  equalsTo(microloc: MicroLocalisation): boolean {
    return (this.site.id == microloc.site.id)
      && (this.quarter.id == microloc.quarter.id)
      && (this.zone.id == microloc.zone.id)
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
  equalsTo(micrlight: MicrolocLight):  boolean {
    return (this.siteId == micrlight.siteId) && (this.quarterId == micrlight.quarterId) && (this.zoneId == micrlight.zoneId);
  }
  toMicroloc(site:Site):MicroLocalisation{
      let quarter = (this.quarterId && site) ? site.quarters.getQuarter(this.quarterId) : undefined;
      let zone =  (this.zoneId && quarter) ? quarter.getZone(this.zoneId) : undefined;
      return new MicroLocalisation(site, quarter, zone, undefined);
  }
}