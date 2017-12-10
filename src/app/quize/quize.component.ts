import { Component, OnInit } from '@angular/core';
import { DataStorage } from '../shared/data.service';
import { ApiService } from '../shared';

@Component({
  selector: 'my-quize',
  templateUrl: './quize.component.html',
})
export class QuizeComponent implements OnInit {
  vm: any;

  constructor(private storage: DataStorage, private api: ApiService) {
  }

  ngOnInit() {
    this.storage.startGame();
    this.api.getQuestions();
    this.vm = this.storage;
  }
}
