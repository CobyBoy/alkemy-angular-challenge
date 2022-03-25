import { Injectable } from '@angular/core';
import { Hero } from '../add-hero/hero';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private _loginToken = 'loginToken';
  private _heroes = 'heroesList';

  constructor() {}

  private getLoginToken(): string {
    return this._loginToken;
  }

  private getHeroesList(): string {
    return this._heroes;
  }

  saveTokenInStorage(token: string): void {
    localStorage.setItem(this.getLoginToken(), JSON.stringify(token));
  }

  clearLocalStorage(): void {
    localStorage.removeItem(this.getLoginToken());
    localStorage.removeItem(this.getHeroesList());
  }

  isInLocalStorage(): boolean {
    return localStorage.getItem(this.getLoginToken()) !== null;
  }

  saveHeroesInLocalStorage(heroes: Hero[]) {
    localStorage.setItem(this.getHeroesList(), JSON.stringify(heroes));
    console.log('saved heroes', typeof localStorage.getItem('heroesList') )
  }

  getHeroesFromLocalStorage() {
    return JSON.parse(localStorage.getItem(this.getHeroesList()) || '[]');
  }
  
}
