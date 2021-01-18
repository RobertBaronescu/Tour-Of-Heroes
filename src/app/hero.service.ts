import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of } from 'rxjs';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  heroes$ = new BehaviorSubject<Hero[]>([]);

  heroSubject$ = new BehaviorSubject<Hero>(null);
  singleHero: Hero | undefined;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
    }),
  };

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  // getHeroes(): Observable<Hero[]> {
  //   // TODO: send the message _after_ fetching the heroes
  //   this.messageService.add('HeroService: fetched heroes');
  //   return of(HEROES);
  // }

  getAllHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');

    return this.http.get<Hero[]>('http://localhost:3000/heroes');
  }

  updateHero(hero: Hero) {
    return this.http.put(
      `http://localhost:3000/heroes/${hero.id}`,
      hero,
      this.httpOptions
    );
  }
}
