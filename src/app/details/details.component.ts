import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Hero } from '../add-hero/hero';
import { HeroesService } from '../services/heroes.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  heroDetails!: Hero
  constructor(private route: ActivatedRoute, private heroService: HeroesService ) {}

  ngOnInit(): void {
    let idRoute = this.route.snapshot.paramMap.get('id')
    console.log('route', idRoute);
    if (idRoute !== null) this.heroService.getHeroById(~~idRoute).pipe(
      map((hero: Hero) => {this.heroDetails = hero})
    ).subscribe();
    
  }
}
