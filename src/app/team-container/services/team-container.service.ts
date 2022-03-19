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
    const isHeroAlreadyOnList = this._heroList.value.some((heroInList: Hero) => { return heroInList.id === heroToAdd.id })
    if (!isHeroAlreadyOnList) {
      this.toastService.showSuccess('Hero added to team');
      this._heroList.next([...this._heroList.value, heroToAdd]);
    }
    else this.toastService.onError('Sorry, hero is already in team and cant be added')
  }

  deleteHero(heroToDelete: Hero): void {
    this._heroList.next(this._heroList.value.filter((heroInList: Hero) => { return heroInList !== heroToDelete }));
    this.toastService.showSuccess('Hero deleted')
  }
}
