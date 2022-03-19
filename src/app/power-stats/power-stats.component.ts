import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../add-hero/hero';
import { TeamContainerService } from '../team-container/services/team-container.service';

@Component({
  selector: 'app-power-stats',
  templateUrl: './power-stats.component.html',
  styleUrls: ['./power-stats.component.scss'],
})
export class PowerStatsComponent implements OnInit {
  @Input() hero!: Hero;
  

  constructor(private teamService: TeamContainerService) {}

  ngOnInit(): void {}

  deleteHero(heroToDelete: Hero): void {
    console.log('hero to delete', heroToDelete);
    this.teamService.deleteHero(heroToDelete)
  }
}
