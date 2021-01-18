import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SingleHeroComponent } from './single-hero/single-hero.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'hero/:id', component: SingleHeroComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
