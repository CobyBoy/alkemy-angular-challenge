import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Hero } from 'src/app/add-hero/hero';
import { ToastService } from 'src/app/services/toast-service.service';

@Injectable({
  providedIn: 'root',
})
export class TeamContainerService {
  private _heroList = new BehaviorSubject<Hero[]>([]);
  currentHero = this._heroList.asObservable();

  constructor(private toastService: ToastService) {}

  addHero(heroToAdd: Hero): void {
    const isHeroAlreadyOnList: boolean = this.isHeroOnList(heroToAdd);

    let badHeroesLength: number = this.filterHeroesByAlignment('bad');
    let goodHeroesLength: number = this.filterHeroesByAlignment('good');
    this.checkIfHeroCanBeAdded(
      isHeroAlreadyOnList,
      badHeroesLength,
      goodHeroesLength,
      heroToAdd
    );
  }

  private isHeroOnList(heroToAdd: Hero): boolean {
    return this._heroList.value.some((heroInList: Hero) => {
      return heroInList.id === heroToAdd.id;
    });
  }

  private filterHeroesByAlignment(alignment: string): number {
    return this._heroList.value.filter((hero: Hero) => {
      return hero.biography.alignment === alignment;
    }).length;
  }

  private checkIfHeroCanBeAdded(
    isHeroAlreadyOnList: boolean,
    badHeroesLength: number,
    goodHeroesLength: number,
    heroToAdd: Hero
  ) {
    if (this._heroList.value.length === 6)
      this.toastService.warning('Sorry. Team is full');
    else if (isHeroAlreadyOnList)
      this.toastService.info(
        'Sorry, hero is already in team and cant be added'
      );
    else if (
      (badHeroesLength === 3 && heroToAdd.biography.alignment === 'bad') ||
      (goodHeroesLength === 3 && heroToAdd.biography.alignment === 'good')
    )
      this.toastService.info(
        `Sorry, only 3 ${heroToAdd.biography.alignment} heroes can be added`
      );
    else {
      this._heroList.next([...this._heroList.value, heroToAdd]);
      this.toastService.showSuccess('Hero added to team');
    }
  }

  deleteHero(heroToDelete: Hero): void {
    this._heroList.next(
      this._heroList.value.filter((heroInList: Hero) => {
        return heroInList !== heroToDelete;
      })
    );
    this.toastService.showSuccess('Hero deleted');
  }
}
