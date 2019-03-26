// src/app/shared/models/site.model.ts

import {Zone} from "./zone.model";
import {Map} from "./map.model";
import {Deserializable} from "./deserializable.model";
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';

export class Site implements Deserializable {
    public name: string;
    public position: Position;
    public phone: string;
    public address: string;
    public address_detail: string;
    public zipCode: string;
    public city: string;
    public map: Map;


  deserialize(input: any): this {
    console.log(input);
    Object.assign(this, input);
    this.map = new Map().deserialize(input.map);
    return this;
  }
}
