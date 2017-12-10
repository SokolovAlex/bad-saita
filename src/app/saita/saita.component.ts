import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { random }  from 'lodash';

const often = () => random(3000, 4000);
const usually = () => random(10000, 20000);
const seldom = () => random(20000, 40000);

@Component({
    selector: 'my-saita',
    templateUrl: './saita.component.html',
    styleUrls: ['./saita.component.scss']
})
export class SaitaComponent {
    get speech(): string {
        return this._speech;
    }
    @Input() set speech(value: string) {
        this._speech = value;
        this.src = '';
        if (value) {
            setTimeout(() => this.src = `/img/BadSanta-Speak.gif`, 0);
        }
    }
    @Input() isHoverable: boolean;
    @ViewChild('canvas') canvas: ElementRef;
    @ViewChild('overlay') overlay: ElementRef;
    src: string;

    private _speech: string;

    constructor() {
        this.pickNose();
        this.lookBack();
        this.blink();
    }

    animate(name: string, sec: Function) {
        const loop = (duration) => {
            setTimeout(() => {
                this.src = '';

                setTimeout(() => this.src = `/img/BadSanta-${name}.gif`, 200);

                loop(duration);
            }, duration());
        };

        loop(sec);
    }

    pickNose() {
        this.animate('Nose', seldom);
    }

    lookBack() {
        this.animate('LookBack', usually);
    }

    blink() {
        this.animate('Blink', often);
    }
}
