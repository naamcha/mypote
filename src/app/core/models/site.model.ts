export class Site {
  constructor(
    public name: string,
    public position: {
      lat: number
      lon: number
    },
    public phone: string,
    public address: string,
    public address_detail: string,
    public zipCode: string,
    public city: string
  ) {}
}
