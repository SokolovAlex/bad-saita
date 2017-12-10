import { Component } from '@angular/core';
import { ApiService } from '../shared';

interface Record {
    nickname: string;
    points: number;
    time: string;
}

@Component({
    selector: 'scoreboard',
    templateUrl: './scoreboard.component.html',
    styleUrls: ['./scoreboard.component.scss']
})
export class ScoreBoardComponent {
    records: Record[];
    maxPoints: Number;

    constructor(private api: ApiService) {
        this.update();
        setInterval(() => this.update, 60000);
    }

    update() {
        this.api.topResults().subscribe(response => {
            this.records = response.results;
            this.maxPoints = response.maxPoints;
        });
    }
}
