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
  addHeroForm!: FormGroup;
  heroesFoundList: Hero[] = [];

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
      cell: (hero: Hero) => '',
    },
    {
      columnDef: 'button',
      header: '',
      cell: (hero: Hero) => '',
    },
  ];
  displayedColumns = this.columns.map((col) => col.columnDef);

  constructor(private heroService: HeroesService, private teamService: TeamContainerService, private toastService: ToastService) {}

  ngOnInit(): void {
    this.addHeroForm = new FormGroup({
      heroName: new FormControl('', Validators.minLength(2)),
    });
  }

  searchHero(): void {
    this.toastService.showSuccess('Searching...')
    this.heroService
      .getHeroByName(this.addHeroForm.value.heroName)
      .pipe(
        tap((data: HeroResponse) => console.log('data', data)),
        map((data: HeroResponse) => {
          this.heroesFoundList = data.results;
        })
      )
      .subscribe(() => console.log("heroesfounlist on search", this.heroesFoundList));
  }

  addHeroToTeam(heroToAdd: Hero): void {
    this.teamService.addHero(heroToAdd);
  }
}
