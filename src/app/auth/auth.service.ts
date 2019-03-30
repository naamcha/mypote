import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public siteId = new BehaviorSubject<string>('75');
  private _userIsAuthenticated = true;

  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }

  constructor() { }

  login() {
    this._userIsAuthenticated = true;
  }

  logout() {
    this._userIsAuthenticated = false;
  }

  setSite(siteId) {
    this.siteId.next(siteId);
  }
}
