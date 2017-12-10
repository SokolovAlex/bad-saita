import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DataStorage } from './shared/data.service';

@Component({
  selector: 'my-app', // <my-app></my-app>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  customSpeach: string;
  gameStarted: Boolean;
  isScoreBoard: Boolean;
  bestSite: string;
  speech: string;
  activeQuestion: any;
  canGoToScoreBoard: Boolean = false;

  constructor(private storage: DataStorage, private router: Router) { }

  isHoverable(): boolean {
      return this.activeQuestion.id === 33;
  }

  onShowSpeach(event: any) {
    if (event.bestSite) {
        this.bestSite = event.text;
    } else {
        this.customSpeach = event.text;
    }
  }

  ngOnInit() {
    this.storage.grade.subscribe(grade => {
        this.customSpeach = grade.text || '';
    });
    this.storage.activeQuestion.subscribe(question => {
        this.activeQuestion = question;
    });

    this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd ) {
            this.isScoreBoard = false;
            this.gameStarted = false;
            this.canGoToScoreBoard = false;

            switch (event.url) {
                case '/result':
                    this.canGoToScoreBoard = true;
                    break;
                case '/scoreboard':
                    this.isScoreBoard = true;
                    break;
                case '/quize':
                    this.gameStarted = true;
                    break;
                default:
                    this.canGoToScoreBoard = true;
              }
        }
    });
  }
}
