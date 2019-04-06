import { Deserializable } from './deserializable.model';
import { Coordinate } from 'tsgeo/Coordinate';
import { Vincenty }   from "tsgeo/Distance/Vincenty";
import { Taxi } from './taxi.model';
import { HotspotNetwork } from '@ionic-native/hotspot/ngx';

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
  public quarters: Quarters;
  public parkings: [];
  public rooms: [];
  public homeWifiBSSID: string;
  public taxi: [] ;

  deserialize(input: any): this {
    // console.log('input', input,input.position);
    Object.assign(this, input);
    this.position = new Coordinate(input.position.lat,input.position.lon)
    this.quarters = new Quarters().deserialize(input.quarters);
    return this;
  }

  getDistanceToSite(coord: Coordinate) : number{
    // console.log(coord);
    let calculator = new Vincenty();
    return (this.position)?  calculator.getDistance(this.position, coord): undefined;
  }
}

export class Quarters implements Deserializable {
  getQuarterFromNFCTag(tagId: string) {
    return this.quarters.find((q:Quarter) => q.getZoneFromScannedNFCTag(tagId)!==undefined);
  }

  public quarters: Quarter[]

  deserialize(input: any): this {
    Object.assign(this, input);
    if (input.quarters) {
      this.quarters = input.quarters.map(quart => new Quarter().deserialize(quart));
    }
    return this;
  }

  getZonesFromScannedWifi(networks):Zone[]{
    let sortedWifi = networks.sort((a, b) => b.level - a.level)
    let sortedZones = sortedWifi.map(wifi=> {
      return this.getQuarterFromWifi(wifi)
    }).filter(zone => zone !== undefined);
    return sortedZones;
  }

  getQuarterFromWifi(networks):Quarter{
    return this.quarters.find( q => networks.find((n:HotspotNetwork)=> n.BSSID == q.wifiBSSID)!==undefined );
  }

  getZoneFromScannedNFCTag(tagId):Zone{
    let quarter:Quarter = this.quarters.find(q => q.getZoneFromScannedNFCTag(tagId) !== undefined)[0];
    if(quarter){
      return quarter.map.find(z=>z.nfcTagId ==tagId)
    }
  }
}

export class Quarter implements Deserializable  {
  public id: number;
  public name: string;
  public wifiBSSID: string;
  public planLink: string;
  public map: Zone[];

  deserialize(input: any): this {
    Object.assign(this, input);
    if (input.linkedZones) {
      this.map = input.zones.map(zone => new Zone().deserialize(zone));
    }
    return this;
  }

  getZoneFromScannedNFCTag(tagId):Zone{
    return this.map.find(zone => tagId == zone.nfcTagId);
  }
}

export class Zone implements Deserializable  {
  public id: number;
  public name: string;
  public planLink: string;
  public wifiBSSID: string;
  public nfcTagId: string;
  public navRouting: string;
  public bleUuid: string;
  public bleMinor: string;
  public bleMajor: string;
  public linkedZones: Zone[];

  deserialize(input: any): this {
    Object.assign(this, input);
    if (input.linkedZones) {
      this.linkedZones = input.linkedZones.map(zone => new Zone().deserialize(zone));
    }
    return this;
  }
}
