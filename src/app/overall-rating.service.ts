import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { HeroSort } from './enums/hero-sort.enum';
import { Hero } from './hero';
import { HeroOverallRatingComponent } from './hero-overall-rating/hero-overall-rating.component';
import { HeroService } from './hero.service';

@Injectable({
  providedIn: 'root',
})
export class OverallRatingService {
  currentFilter: HeroSort = HeroSort.Id;
  unsortedListWarning: boolean;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
    }),
  };

  newHero: Hero;


  calculateOverallRating(hero: Hero): number {
    const { combat, speed, intelligence, strength } = hero.powerStats;
    const rating = combat + speed + intelligence + strength;
    hero.powerStats.overallRating = rating;
    return rating;
  }

  calculateRatingColor(rating: number): string {
    if (rating <= 10 && rating > 0) {
      return 'low-rating';
    } else if (rating <= 20 && rating > 10) {
      return 'medium-rating';
    } else if (rating <= 30 && rating > 20) {
      return 'high-rating';
    } else {
      return 'powerful-rating';
    }
  }

  sortById(heroes: Hero[]): Hero[] {
    this.currentFilter = HeroSort.Id;
    // lodash
    // import * as _ from 'lodash';
    // import cloneDeep from 'lodash/cloneDeep';
    // const clone = cloneDeep(heroes)

    const clone = JSON.parse(JSON.stringify(heroes)) as Hero[];
    // const sortedHeroes = sortBy(clone,["id", "name"])

    return clone.sort((a, b) => a.id - b.id);
  }

  sortByRating(heroes: Hero[]): Hero[] {
    this.currentFilter = HeroSort.Rating;
    const clone = JSON.parse(JSON.stringify(heroes)) as Hero[];

    return clone.sort((a, b) => {
      const aRating =
        a.powerStats.combat +
        a.powerStats.intelligence +
        a.powerStats.speed +
        a.powerStats.strength;
      const bRating =
        b.powerStats.combat +
        b.powerStats.intelligence +
        b.powerStats.speed +
        b.powerStats.strength;

      return aRating > bRating ? 1 : bRating > aRating ? -1 : 0;
    });
  }

  verifyAfterInput(heroId: number): void {
    if (this.currentFilter === HeroSort.Id) {
      return undefined;
    }

    const heroes = this.heroService.heroes$.getValue();

    const sortedHeroes = this.sortByRating(heroes);

    this.newHero = heroes.find((hero) => hero.id === heroId);

    const heroIndex = heroes.findIndex((hero) => hero.id === heroId);

    const sortedHeroIndex = sortedHeroes.findIndex(
      (hero) => hero.id === heroId
    );

    this.unsortedListWarning = heroIndex !== sortedHeroIndex;
  }



  constructor(private heroService: HeroService, private http: HttpClient) {}
}
