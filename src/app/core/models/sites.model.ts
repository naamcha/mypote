import { Deserializable } from './deserializable.model';
import { Coordinate } from 'tsgeo/Coordinate';
import { Site } from './site.model';

export class Sites implements Deserializable {
  public sites: Site[];
  
  deserialize(input: any): this {
    // console.log(input)
    this.sites = input.map((site) => new Site().deserialize(site));
    return this;
  }

  getNearestSite(coord: Coordinate) : Site{
    // console.log(coord);
    let minDist = 1000000;
    let retSite:Site;
    this.sites.forEach(site => {
      let dist = site.getDistanceFromCoordinate(coord);
      if(dist<minDist){ minDist = dist; retSite = site;}  
    });
    return retSite;
  }

  getSiteFromScannedNetwork(networks):Site{
    let filteredSites = this.sites.filter(site=>
        {
          networks.forEach(network => {
            if(network.homeWifiBSSID = site.homeWifiBSSID) return true;
          });
          return false;
        }
    );
    return filteredSites[0];
  }

  getSiteFromScannedNFC(tag):Site{
    let filteredSites = this.sites.filter(site=>
        {
            if(site.map.getZoneFromScannedNFCTag(tag)) return true;
            return false;
        }
    );
    return filteredSites[0];
  }

  getSiteFromScannedWifi(network):Site{
    let filteredSites = this.sites.filter(site=>
        {
           network.filter(wifi => {
                if(site.homeWifiBSSID == wifi.BSSID) return true;
                return false;
           }); 
           return network.lenght !== 0;
        }
    );
    return filteredSites[0];
  }
}