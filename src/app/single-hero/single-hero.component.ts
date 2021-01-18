import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { HeroService } from '../hero.service';

@UntilDestroy()
@Component({
  selector: 'app-single-hero',
  templateUrl: './single-hero.component.html',
  styleUrls: ['./single-hero.component.css'],
})
export class SingleHeroComponent implements OnInit, OnDestroy {
  constructor(public heroService: HeroService) {}

  ngOnInit(): void {
    this.heroService.heroSubject$
      .pipe(untilDestroyed(this))
      .subscribe((hero) => {
        this.heroService.singleHero = hero;
      });
  }

  ngOnDestroy() {}
}
