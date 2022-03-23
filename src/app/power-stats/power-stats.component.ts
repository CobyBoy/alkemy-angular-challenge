import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from '../add-hero/hero';
import { TeamContainerService } from '../team-container/services/team-container.service';

@Component({
  selector: 'app-power-stats',
  templateUrl: './power-stats.component.html',
  styleUrls: ['./power-stats.component.scss'],
})
export class PowerStatsComponent implements OnInit {
  @Input() hero!: Hero;

  constructor(
    private teamService: TeamContainerService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  getHeroDetails(heroId: number): void {
    this.router.navigate([`details/${heroId}`]);
  }

  deleteHeroFromTeam(heroToDelete: Hero): void {
    this.teamService.deleteHero(heroToDelete);
  }
}
