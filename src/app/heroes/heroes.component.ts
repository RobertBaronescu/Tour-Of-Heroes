import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { OverallRatingService } from '../overall-rating.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  selectedHero: Hero;
  heroes$ = this.heroService.heroes$.asObservable();

  constructor(
    public heroService: HeroService,
    private messageService: MessageService,
    public overallRatingService: OverallRatingService
  ) {}

  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
    this.heroService.heroSubject$.next(hero);
  }

  getHeroes(): void {
    this.heroService
      .getAllHeroes()
      .pipe(
        tap((heroes: Hero[]) => {
          this.heroService.heroes$.next(heroes);
          this.heroService.sortStrongestHeroes();
        })
      )
      .subscribe();
  }

  onSortHeroesByIdClick() {
    const heroes = this.heroService.heroes$.getValue();
    const sortedByIdHeroes = this.overallRatingService.sortById(heroes);
    this.heroService.heroes$.next(sortedByIdHeroes);
  }

  onSortHeroesByRatingClick() {
    const heroes = this.heroService.heroes$.getValue();
    const sortedByRatingHeroes = this.overallRatingService.sortByRating(heroes);
    this.heroService.heroes$.next(sortedByRatingHeroes);
    this.overallRatingService.unsortedListWarning = false;
  }
}
