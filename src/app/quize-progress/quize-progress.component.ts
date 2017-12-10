import { Component } from '@angular/core';

import { DataStorage } from '../shared/data.service';

class Result {
    status: string;
    constructor(status: string) {
        this.status = status;
    }
}

@Component({
  selector: 'my-progress',
  templateUrl: './quize-progress.component.html',
  styleUrls: ['./quize-progress.component.scss']
})
export class ProgressComponent {
  results: Result[];

  currentIndex: any;

  gameStarted: Boolean;

  constructor(private storage: DataStorage) {
    this.storage.questions.subscribe(questions => {
        this.results = questions.map(() => new Result('unknown'));
        if (this.results.length) {
            this.results[0].status = 'active';
        }
    });

    this.storage.index.subscribe(value => {
        this.currentIndex = value;
        let currentResult = this.results[this.currentIndex];
        if (currentResult) {
          currentResult.status = 'active';
        }
    });

    this.storage.lastResult.subscribe(result => {
        let lastResult = this.results[result.index];
        lastResult.status = result.isRight ? 'ok' : 'wrong';
    });

    this.storage.gameStarted.subscribe(value => {
        this.gameStarted = value;
        this.currentIndex = 0;
    });
  }
}
