// src/app/shared/models/site.model.ts

import {Zone} from "./zone.model";
import {Deserializable} from "./deserializable.model";

export class Map implements Deserializable {

  public zones: Zone[]

  deserialize(input: any): this {
    this.zones = input.zones.map(zone => new Zone().deserialize(zone));
    return this;
  }
}
