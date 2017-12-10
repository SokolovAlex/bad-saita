import { Component, OnInit } from '@angular/core';
import { DataStorage } from '../../shared/data.service';

@Component({
  selector: 'last-result',
  templateUrl: './last-result.template.html',
  styleUrls: ['./last-result.style.scss']
})
export class LastResultComponent implements OnInit {
  isRight: boolean = null;
  points = 0;
  answer: Object = {};

  constructor(private storage: DataStorage) {
  }

  ngOnInit() {
    this.storage.lastResult.subscribe(result => {
        this.isRight = result.isRight;
        this.points = result.points;
        this.answer = result.answer;
    });
  }
}
