class Map {
  constructor(
    public id: string,
    public stageNumber: number,
    public planLink: string,
    public nfcTagId: number[],
    public bleUuid: string,
    public bleMinor: string,
    public bleMajor: string,
    public linkedZonesId: any[]
  ){}
}

class Position {
  constructor(
    public lat: number,
    public lon: number,
  ){}
}

export class Site {
  constructor(
    public id: string,
    public name: string,
    public position: Position,
    public phone: string,
    public address: string,
    public addressDetail: string,
    public zipCode: string,
    public city: string,
    public people?: any,
    public map?: Map[]) {}
}
