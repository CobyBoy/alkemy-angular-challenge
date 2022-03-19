import { Component, OnInit } from '@angular/core';
import { TeamContainerService } from './services/team-container.service';
import { MatDialog } from '@angular/material/dialog';
import { AddHeroComponent } from '../add-hero/add-hero.component';
import { Hero } from '../add-hero/hero';
import { tap } from 'rxjs';

@Component({
  selector: 'app-team-container',
  templateUrl: './team-container.component.html',
  styleUrls: ['./team-container.component.scss'],
})
export class TeamContainerComponent implements OnInit {
  heroListInContainer: Hero[] = [];
  combatSum: number = 0;
  durabilitySum: number = 0;
  intelligenceSum: number = 0;
  powerSum: number = 0;
  speedSum: number = 0;
  strengthSum: number = 0;

  constructor(
    private teamService: TeamContainerService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.teamService.currentHero.subscribe((heroes: Hero[]) => {
      this.heroListInContainer = [...heroes];
      heroes.forEach((hero: Hero) => {
        this.combatSum += ~~hero.powerstats.combat;
        this.durabilitySum += Number(hero.powerstats.durability);
        this.intelligenceSum += Number(hero.powerstats.intelligence);
        this.powerSum += Number(hero.powerstats.power);
        this.speedSum += Number(hero.powerstats.speed);
        this.strengthSum += Number(hero.powerstats.strength);
      });
      console.log('received hero subscribe ngoinit', heroes);
      console.log('oninit onsubscribe list', this.heroListInContainer);
    });
    
  }

  openDialog(): void {
    this.dialog.open(AddHeroComponent);
  }
}
