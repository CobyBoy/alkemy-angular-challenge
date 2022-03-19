import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private _loginToken = 'loginToken';

  constructor() { }

  private getLoginToken(): string {
    return this._loginToken;
  }

  saveTokenInStorage(token: string): void {
    localStorage.setItem(this.getLoginToken(), JSON.stringify(token));
  }

  clearTokenFromLocalStorage(): void {
    localStorage.removeItem(this.getLoginToken());
  }

  isInLocalStorage(): boolean {
    return localStorage.getItem(this.getLoginToken()) !== null;
  }

  
}
