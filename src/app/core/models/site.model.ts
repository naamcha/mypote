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
    console.log(input);
    // console.log('input', input,input.position);
    Object.assign(this, input);
    this.position = new Coordinate(input.position.lat,input.position.lon)
    this.quarters = new Quarters().deserialize(input.quarters);
    return this;
  }

  getQuartersFromScannedNfc(tagId: any) {
    console.log('getQuartersFromScannedNfc',this.quarters.getQuarterFromScannedNfc(tagId))
    return this.quarters.getQuarterFromScannedNfc(tagId);
  }

  getQuarterFromScannedWifi(network: HotspotNetwork[]):Quarter {
    return this.quarters.getQuarterFromScannedWifi(network);
  }
  
  getDistanceToSite(coord: Coordinate) : number{
    let calculator = new Vincenty();
    return (this.position)?  calculator.getDistance(this.position, coord): undefined;
  }
}

export class Quarters implements Deserializable {
  
  public quarters: Quarter[]
  
  deserialize(input: any): this {
    // console.log('Quarters deseriakise',input);
    if (input) {
      this.quarters = input.map(quart => new Quarter().deserialize(quart));
    }
    return this;
  }
  
  getQuarterFromScannedNfc(tagId: string) {
    return this.quarters.find(quarter => undefined !== quarter.getZoneFromScannedNfc(tagId));
  }
  
  getQuarterFromScannedWifi(networks:HotspotNetwork[]):Quarter{
    return this.quarterWifiDetectionStrategy(networks)[0];
  }
  quarterWifiDetectionStrategy(networks:HotspotNetwork[]):Quarter[]{
    let sortedWifi = networks.sort((a, b) => b.level - a.level);
    return this.quarters.filter(quart => undefined !== sortedWifi.find(wifi=>wifi.BSSID == quart.wifiBSSID))
    //can be complexified
  }
  
  getQuarterFromWifi(wifi:HotspotNetwork):Quarter{
    console.log(wifi,this,this.quarters.find( q => q.wifiBSSID == wifi.BSSID));
    return this.quarters.find( q => q.wifiBSSID == wifi.BSSID);
  }

  getZoneFromScannedNfc(tagId):Zone{
    let quarter:Quarter = this.quarters.find(q => q.getZoneFromScannedNfc(tagId) !== undefined);
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
    console.log(input)
    Object.assign(this, input);
    this.map = input.map.map(zone => new Zone().deserialize(zone));
    return this;
  }

  getZoneFromScannedNfc(tagId):Zone{
    // console.log('nfc',this,tagId)
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
