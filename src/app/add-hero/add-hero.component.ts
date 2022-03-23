import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, tap } from 'rxjs';
import { HeroesService } from '../services/heroes.service';
import { ToastService } from '../services/toast-service.service';
import { TeamContainerService } from '../team-container/services/team-container.service';
import { Hero, HeroResponse } from './hero';

@Component({
  selector: 'app-add-hero',
  templateUrl: './add-hero.component.html',
  styleUrls: ['./add-hero.component.scss'],
})
export class AddHeroComponent implements OnInit {
  addHeroToTeamPopUpForm!: FormGroup;
  heroesFoundInSearch: Hero[] = [];

  columns = [
    {
      columnDef: 'id',
      header: 'ID',
      cell: (hero: Hero) => `${hero.id}`,
    },
    {
      columnDef: 'name',
      header: 'NAME',
      cell: (hero: Hero) => `${hero.name}`,
    },
    {
      columnDef: 'image',
      header: 'HERO IMAGE',
      cell: () => '',
    },
    {
      columnDef: 'button',
      header: '',
      cell: () => '',
    },
  ];
  displayedColumns = this.columns.map((col) => col.columnDef);

  constructor(
    private heroService: HeroesService,
    private teamService: TeamContainerService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.addHeroToTeamPopUpForm = new FormGroup({
      heroName: new FormControl('', Validators.minLength(2)),
    });
  }

  searchHeroByName(): void {
    this.toastService.info('Searching...');
    this.heroService
      .getHeroByName(this.addHeroToTeamPopUpForm.value.heroName)
      .pipe(
        map((data: HeroResponse) => {
          this.heroesFoundInSearch = data.results;
        })
      )
      .subscribe();
  }

  addHeroToTeam(heroToAdd: Hero): void {
    this.teamService.addHero(heroToAdd);
  }
}
