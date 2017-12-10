import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { QuizeComponent } from './quize/quize.component';
import { ResultsComponent } from './results/results.component';
import { ScoreBoardComponent } from './scoreboard/scoreboard.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'quize', component: QuizeComponent},
  { path: 'result', component: ResultsComponent},
  { path: 'scoreboard', component: ScoreBoardComponent},
  { path: '**', component: HomeComponent},
];

export const routing = RouterModule.forRoot(routes);
