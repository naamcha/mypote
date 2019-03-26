// src/app/shared/models/site.model.ts

import {Zone} from "./zone.model";
import {Deserializable} from "./deserializable.model";

export class Map implements Deserializable {

  public zones: Zone[]

  deserialize(input: any): this {
    this.zones = input.map(zone => new Zone().deserialize(input));
    return this;
  }
}
