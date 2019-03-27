export class Site {
  constructor(
    public id: string,
    public name: string,
    public position: {
      lat: number
      lon: number
    },
    public phone: string,
    public address: string,
    public addressDetail: string,
    public zipCode: string,
    public city: string,
    public people: [],
    public zones: [],
  ) {}
}
