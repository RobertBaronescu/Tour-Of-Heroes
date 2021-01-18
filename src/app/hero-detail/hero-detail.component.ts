import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ViewChildren,
  QueryList,
  OnDestroy,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { until } from 'protractor';
import { fromEvent } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
} from 'rxjs/operators';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { OverallRatingService } from '../overall-rating.service';

@UntilDestroy()
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() hero: Hero;

  @ViewChildren('statsInput') statsInput: QueryList<ElementRef>;

  constructor(
    public overallRatingService: OverallRatingService,
    private heroService: HeroService
  ) {}

  ngAfterViewInit(): void {
    this.statsInput.toArray().forEach((input) => {
      fromEvent(input.nativeElement, 'keyup')
        .pipe(
          debounceTime(500),
          distinctUntilChanged(),
          tap(() => {
            this.overallRatingService.verifyAfterInput(this.hero.id);
          }),
          switchMap(() => {
            return this.heroService.updateHero(
              this.overallRatingService.newHero
            );
          }),
          untilDestroyed(this)
        )
        .subscribe();
    });
  }

  ngOnInit() {}

  ngOnDestroy() {}
}
