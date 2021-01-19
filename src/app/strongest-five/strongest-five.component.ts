import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { OverallRatingService } from '../overall-rating.service';

@Component({
  selector: 'app-strongest-five',
  templateUrl: './strongest-five.component.html',
  styleUrls: ['./strongest-five.component.css'],
})
export class StrongestFiveComponent implements OnInit {
  strongestHeroes: Hero[];

  constructor(
    public overallRatingService: OverallRatingService,
    public heroService: HeroService
  ) {}

  ngOnInit(): void {
    this.heroService.strongestHeroes$.subscribe((heroes) => {
      this.strongestHeroes = [...heroes];
    });
  }
}
