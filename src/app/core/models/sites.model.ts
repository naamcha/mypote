import { Deserializable } from './deserializable.model';
import { Coordinate } from 'tsgeo/Coordinate';
import { Site } from './site.model';
import { HotspotNetwork } from '@ionic-native/hotspot/ngx';

export class Sites implements Deserializable {
  public sites: Site[];

  deserialize(input: any): this {
    // console.log(input)
    this.sites = input.map((site) => new Site().deserialize(site));
    return this;
  }

  getNearestSite(coord: Coordinate): Site {
    // console.log(coord);
    let minDist = 1000000;
    let retSite: Site;
    this.sites.forEach(site => {
      let dist = site.getDistanceToSite(coord);
      if (dist < minDist) { minDist = dist; retSite = site; }
    });
    return retSite;
  }

  getDistanceToNearestSite(coord: Coordinate): number {
    // console.log(coord);
    let minDist = 1000000;
    let retSite: Site;
    this.sites.forEach(site => {
      let dist = site.getDistanceToSite(coord);
      if (dist < minDist) { minDist = dist; retSite = site; }
    });
    return minDist;
  }

  getSiteFromScannedWifi(networks:HotspotNetwork[]): Site {
    return this.sites.find(site => undefined !== site.getQuarterFromScannedWifi(networks))
  }

  getSiteFromScannedNFC(tagId): Site {
    return this.sites.find(site => undefined !== site.getQuartersFromScannedNfc(tagId));
  }
}
