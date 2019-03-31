import {Deserializable} from "./deserializable.model";

export class Zone implements Deserializable  {
    public id: number;
    public planLink: string;
    public nfcTagId: string[4];
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
