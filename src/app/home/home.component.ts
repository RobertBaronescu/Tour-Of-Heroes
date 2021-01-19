import { Component, OnInit } from '@angular/core';
import { OverallRatingService } from '../overall-rating.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'Tour of Heroes';
  constructor(public overallRatingService: OverallRatingService) {}

  ngOnInit(): void {}
}
