// src/app/shared/models/site.model.ts

import {Zone} from "./zone.model";
import {Deserializable} from "./deserializable.model";

export class Map implements Deserializable {

  public zones: Zone[]

  deserialize(input: any): this {
    console.log(input)
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
}
