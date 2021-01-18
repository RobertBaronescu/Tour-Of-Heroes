import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-first-five',
  templateUrl: './first-five.component.html',
  styleUrls: ['./first-five.component.css'],
})
export class FirstFiveComponent implements OnInit {
  firstFiveHeroes$ = this.heroService.heroes$
    .asObservable()
    .pipe(
      map((heroes) => {
        return (heroes = heroes.slice(0, 5));
      })
    )
  constructor(public heroService: HeroService) {}

  ngOnInit(): void {}
}
