import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataStorage } from '../shared/data.service';
import { ApiService } from '../shared';

@Component({
  selector: 'my-results',
  templateUrl: './results.template.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {
  points: Number;
  maxPoints: Number;
  time: String;
  nickname: String = '';
  email: String = '';
  resultSaved = false;
  seconds: Number = 0;
  grade: String;

  constructor(storage: DataStorage, private api: ApiService, private router: Router) {
    if (!storage.gameFinished.value) {
        this.router.navigate(['/']);
        return;
    }
    const { points, maxPoints, resultTime } = storage;

    this.points = points;
    this.maxPoints = maxPoints;
    this.seconds = resultTime.seconds;
    this.time = resultTime ? resultTime.stringFormat : '00:00';

    storage.grade.subscribe(grade => {
        this.grade = grade.type || '';
    });
  }

  sendResults() {
    this.api.saveResult({
        points: this.points,
        nickname: this.nickname,
        email: this.email,
        seconds: this.seconds,
        time: this.time
    }).subscribe((res: any) => {
        if (res.success) {
            this.nickname = '';
            this.email = '';
            this.resultSaved = true;
        }
    });
  }
}
