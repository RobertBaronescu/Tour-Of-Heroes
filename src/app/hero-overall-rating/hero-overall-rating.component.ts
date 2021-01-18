import { Component, Input, OnInit } from '@angular/core';
import { OverallRatingService } from '../overall-rating.service';

@Component({
  selector: 'app-hero-overall-rating',
  templateUrl: './hero-overall-rating.component.html',
  styleUrls: ['./hero-overall-rating.component.css'],
})
export class HeroOverallRatingComponent implements OnInit {
  @Input() rating: number;

  
  constructor(public overallRatingService: OverallRatingService) {}

  ngOnInit(): void {}
}
