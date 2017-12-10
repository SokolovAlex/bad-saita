import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

class Question {
    points: number;
    variants: any;
    type: any;
    id: any;
    text: any;
    action: any;
    actionParams: any;
    constructor(data) {
      this.points = data.points;
      this.variants = data.variants;
      this.type = data.type;
      this.text = data.text;
      this.id = data.id;
      this.action = data.action;
      this.actionParams = data.actionParams;
    }
}

interface Grade {
    type: string;
    text: string;
}

const calcGrage = (points, maxPoints) => {
    const percantage = points / maxPoints;

    if (percantage < 0.33 ) {
        return { text: 'Maybe next time your result will be better', type: 'bad'};
    }

    if (percantage < 0.66) {
        return { text: 'Not bad, but also not good', type: 'normal'};
    }

    return { text: 'Clever boy', type: 'good'};
};

@Injectable()
export class DataStorage {
  questions: BehaviorSubject<Question[]>;
  activeQuestion: BehaviorSubject<any>;
  lastResult: Subject<any>;
  index: BehaviorSubject<number> = new BehaviorSubject(0);
  points: number;
  maxPoints: number;
  resultTime: any;
  grade: BehaviorSubject<Grade> = new BehaviorSubject({ text: '', type: 'bad' });
  gameStarted: BehaviorSubject<Boolean>;
  gameFinished: BehaviorSubject<Boolean>;

  constructor(private router: Router) {
      this.questions = new BehaviorSubject([]);
      this.gameStarted = new BehaviorSubject(false);
      this.gameFinished = new BehaviorSubject(false);
      this.activeQuestion = new BehaviorSubject({});
      this.lastResult = new Subject();
      this.points = 0;
  }

  save(data: any) {
    this.questions.next(data.questions.map(x => new Question(x)));
    this.maxPoints = data.maxPoints;
    this.activeQuestion.next(this.questions.value[0]);
  }

  nextQuestion(response: any) {
    if (!response.success) {
        return;
    }

    let result = response.result;
    this.points = this.points + result.points;
    result.index = this.index.value;

    this.index.next(this.index.value + 1);
    this.lastResult.next(result);

    if (!this.questions.value[this.index.value]) {
      this.endGame();
    } else {
      this.activeQuestion.next(this.questions.value[this.index.value]);
    }
  }

  startGame() {
    this.gameStarted.next(true);
    this.index.next(0);
    this.points = 0;
  }

  endGame() {
    this.grade.next(calcGrage(this.points, this.maxPoints));
    this.gameFinished.next(true);
    this.router.navigate(['/result']);
  }
}



