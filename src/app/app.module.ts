import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { HeroOverallRatingComponent } from './hero-overall-rating/hero-overall-rating.component';
import { CommonModule } from '@angular/common';
import { SingleHeroComponent } from './single-hero/single-hero.component';
import { AppRoutingModule } from './app-routing.module';
import { FirstFiveComponent } from './first-five/first-five.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    HeroOverallRatingComponent,
    SingleHeroComponent,
    FirstFiveComponent,
    HomeComponent,
  ],
  imports: [BrowserModule, FormsModule, CommonModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
