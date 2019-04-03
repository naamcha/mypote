import { Deserializable } from './deserializable.model';
import { Coordinate } from 'tsgeo/Coordinate';
import { Vincenty }   from "tsgeo/Distance/Vincenty";
import { Taxi } from './taxi.model';

export class Site implements Deserializable {
  public id: string;
  public name: string;
  public position: Coordinate;
  public phone: string;
  public address: string;
  public addressDetail: string[];
  public zipCode: string;
  public city: string;
  public people: any;
  public map: Map;
  public parkings: [];
  public rooms: [];
  public homeWifiBSSID: string;
  public taxi: Taxi ;

  deserialize(input: any): this {
    // console.log('input', input,input.position);
    Object.assign(this, input);
    this.position = new Coordinate(input.position.lat,input.position.lon)
    this.map = new Map().deserialize(input.map);
    return this;
  }

  getDistanceToSite(coord: Coordinate) : number{
    // console.log(coord);
    let calculator = new Vincenty();
    return (this.position)?  calculator.getDistance(this.position, coord): undefined;
  }
}

class Map implements Deserializable {

  public zones: Zone[]

  deserialize(input: any): this {
    // console.log(input)
    this.zones = input.map(zone => new Zone().deserialize(zone));
    return this;
  }

  getZoneFromScannedNFCTag(tag):Zone{
    let filteredZones = this.zones.filter(zone=>
        {
            if(tag.id = zone.nfcTagId) return true;
            return false;
        }
    );
    return filteredZones[0];
  }

  getZonesFromScannedWifi(networks):Zone[]{
    let sortedWifi = networks.sort((a, b) => b.level - a.level)
    let sortedZones = sortedWifi.map(wifi=> {
      console.log(this.getZoneFromWifi(wifi))
      return this.getZoneFromWifi(wifi)
    });
    return sortedZones;
  }

  getZoneFromWifi(wifi):Zone{
    return this.zones.find( zone => zone.wifiBSSID == wifi.BSSID );
  }
}

class Zone implements Deserializable  {
  public id: number;
  public name: string;
  public planLink: string;
  public nfcTagId: string[4];
  public bleUuid: string;
  public bleMinor: string;
  public bleMajor: string;
  public wifiBSSID: string;
  public linkedZones: Zone[];

  deserialize(input: any): this {
    Object.assign(this, input);
    if (input.linkedZones) {
      this.linkedZones = input.linkedZones.map(zone => new Zone().deserialize(zone));
    }
    return this;
  }
}
