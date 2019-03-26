import { Map } from './map.model';
import { Deserializable } from './deserializable.model';

export class Site implements Deserializable {
  public id: string;
  public name: string;
  public position: Position;
  public phone: string;
  public address: string;
  public addressDetail: string;
  public zipCode: string;
  public city: string;
  public people: any;
  public map: Map;

  deserialize(input: any): this {
    // console.log('input', input);
    Object.assign(this, input);
    this.map = new Map().deserialize(input.map);
    return this;
  }
}
