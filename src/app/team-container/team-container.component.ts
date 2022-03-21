import { Component, OnInit } from '@angular/core';
import { TeamContainerService } from './services/team-container.service';
import { MatDialog } from '@angular/material/dialog';
import { AddHeroComponent } from '../add-hero/add-hero.component';
import { Hero } from '../add-hero/hero';

@Component({
  selector: 'app-team-container',
  templateUrl: './team-container.component.html',
  styleUrls: ['./team-container.component.scss'],
})
export class TeamContainerComponent implements OnInit {
  heroListInContainer: Hero[] = [];
  combatSum!: number;
  durabilitySum!: number;
  intelligenceSum!: number;
  powerSum!: number;
  speedSum!: number;
  strengthSum!: number;
  powerStatsSortedFormatted!: string[];

  constructor(
    private teamService: TeamContainerService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.teamService.currentHero.subscribe((heroes: Hero[]) => {
      this.heroListInContainer = [...heroes];
      console.log('received hero subscribe ngoinit', heroes);
      console.log('oninit onsubscribe list', this.heroListInContainer);
      this.calculatePowerStats();
    });
  }

  openDialog(): void {
    this.dialog.open(AddHeroComponent);
  }

  private calculatePowerStats(): void {
    console.log('calculating...');
    this.combatSum = 0;
    this.durabilitySum = 0;
    this.intelligenceSum = 0;
    this.powerSum = 0;
    this.speedSum = 0;
    this.strengthSum = 0;
    this.heroListInContainer.forEach((hero: Hero) => {
      let powerstats = hero.powerstats;
      this.combatSum += ~~powerstats.combat;
      this.durabilitySum += ~~powerstats.durability;
      this.intelligenceSum += ~~powerstats.intelligence;
      this.powerSum += ~~powerstats.power;
      this.speedSum += ~~powerstats.speed;
      this.strengthSum += ~~powerstats.strength;
    });
    this.calculateMax();
  }

  private calculateMax(): void {
    let powerstats = {
      combat: this.combatSum,
      durability: this.durabilitySum,
      intelligence: this.intelligenceSum,
      power: this.powerSum,
      speed: this.speedSum,
      strength: this.strengthSum,
    };

    let powerStatsKeyAndValue = Object.entries(powerstats);
    //sort it by max value
    let powerStatsSorted = powerStatsKeyAndValue.sort(
      (a: [string, number], b: [string, number]) => b[1] - a[1]
    );
    console.log('entriesSorted', powerStatsSorted);
    this.formatPowerStats(powerStatsSorted);
  }

  //formats it so it shows combat: 0 instead of combat,0
  private formatPowerStats(powerStatsSorted: [string, number][]): void {
    this.powerStatsSortedFormatted = powerStatsSorted.map(
      (entry: [string, number]) => {
        return entry.join().replace(',', ': ');
      }
    );
    console.log(powerStatsSorted);
  }
}
