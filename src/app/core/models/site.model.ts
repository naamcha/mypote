import { Map } from './map.model';
import { Deserializable } from './deserializable.model';
import { Coordinate } from 'tsgeo/Coordinate';
import { Vincenty }   from "tsgeo/Distance/Vincenty";

export class Site implements Deserializable {
  public id: string;
  public name: string;
  public position: Coordinate;
  public phone: string;
  public address: string;
  public addressDetail: string;
  public zipCode: string;
  public city: string;
  public people: any;
  public map: Map;
  public homeWifiBSSID: string;
  
  deserialize(input: any): this {
    // console.log('input', input,input.position);
    Object.assign(this, input);
    this.position = new Coordinate(input.position.lat,input.position.lon)
    this.map = new Map().deserialize(input.map);
    return this;
  }

  getDistanceFromCoordinate(coord: Coordinate) : number{
    console.log(coord);
    let calculator = new Vincenty();
    return (this.position)?  calculator.getDistance(this.position, coord): undefined;
  }
}
