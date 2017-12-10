import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { DataStorage } from '../../shared/data.service';

@Component({
  selector: 'quize-info',
  templateUrl: './quize-info.template.html',
  styleUrls: ['./quize-info.style.scss']
})
export class QuizeInfoComponent implements OnInit {
  points = 0;
  time = '00:00';
  gameFinished = false;
  timer = Observable.timer(1000, 1000);
  timerSubscribe = null;

  constructor(private storage: DataStorage) { }

  ngOnInit() {
    let seconds = 0;

    this.storage.gameStarted.subscribe(result => {
        if (result) {
            this.points = 0;
            seconds = 0;
            this.time = '00:00';

            this.stopTimer();

            this.timerSubscribe = this.timer.subscribe(() => {
                seconds++;
                let mins = ('0' + Math.floor(seconds / 60)).slice(-2);
                let secs = ('0' + seconds % 60).slice(-2);
                this.time = `${mins}:${secs}`;
            });
        }
    });

    this.storage.lastResult.subscribe(result => {
        this.points += result.points;
    });

    this.storage.gameFinished.subscribe(result => {
        if (result) {
          this.stopTimer();
          this.storage.resultTime = { stringFormat: this.time, seconds };
          this.gameFinished = true;
        }
    });
  }

  stopTimer() {
    if (this.timerSubscribe) {
        this.timerSubscribe.unsubscribe();
    }
  }
}
