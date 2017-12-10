import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { QuizeComponent } from './quize/quize.component';
import { ProgressComponent } from './quize-progress/quize-progress.component';

import { QuizeInfoComponent } from './quize/quize-info/quize-info.component';
import { LastResultComponent } from './quize/last-result/last-result.component';
import { QuestionComponent } from './quize/question/question.component';


import { ResultsComponent } from './results/results.component';
import { ElfComponent } from './elf/elf.component';
import { SaitaComponent } from './saita/saita.component';
import { ScoreBoardComponent } from './scoreboard/scoreboard.component';

import { ApiService, DataStorage } from './shared';
import { routing } from './app.routing';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    QuizeComponent,
    ProgressComponent,

    ResultsComponent,
    QuizeInfoComponent,
    QuestionComponent,
    LastResultComponent,
    ElfComponent,
    SaitaComponent,
    ScoreBoardComponent,
  ],
  providers: [
    ApiService,
    DataStorage
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {

  }
}
