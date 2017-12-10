import { Component, EventEmitter, Output } from '@angular/core';
import { DataStorage } from '../shared/data.service';
import { ApiService } from '../shared';
import { range, each } from 'lodash';
import { Headers } from '@angular/http';

@Component({
    selector: 'elf',
    template: ''
})
export class ElfComponent {
    @Output() showSpeech: EventEmitter<any> = new EventEmitter();

    constructor(private storage: DataStorage, private api: ApiService) {
        this.storage.activeQuestion.subscribe(question => {
            if (question.action && this[question.action]) {
                this[question.action].apply(this, question.actionParams);
            }
        });
        localStorage.clear();
        this.clearCookie();
    }

    say(words) {
        console.log('SANTA: ', words);
    }

    post(times, times2) {
        each(range(0, times2), () => {
            this.api.getFakeQuestion();
        });
        each(range(0, times), () => {
            this.api.fakePost(null);
        });
    }

    bind(events) {
        let el = document.getElementsByClassName('bad_santa');
        each(events, (event) => {
            el[0].addEventListener(event, () => { });
        });
    }

    addClasses(classes) {
        let el = document.getElementsByClassName('commit-btn')[0];
        each(classes, (className) => {
            el.className += ' ' + className;
        });
    }

    addSantaSpeech(site) {
        this.showSpeech.emit({ text: `This is my best <a href="${site}"> site </a>`, bestSite: true });
    }

    postWithHeaders(headersParams) {
        let headers = new Headers();
        each(headersParams, (param) => {
            headers.append(param.key, param.value);
        });
        this.api.fakePost(headers);
    }

    setInLocalStorage(key) {
        localStorage.setItem(key, 'is drunk');
    }

    readCookie(cookiePart) {
        setInterval(() => {
            if (document.cookie.indexOf(cookiePart) !== -1) {
                this.showSpeech.emit({ text: 'ho-ho. Answer is A.' });

                setTimeout(() => {
                    this.showSpeech.emit({ text: null });
                }, 5000);

                this.clearCookie();
            }
        }, 1000);
    }

    clearCookie() {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            let eqPos = cookie.indexOf('=');
            let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            if (name !== 'dedmoroz') {
                document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
            }
        }
        document.cookie = '';
    }

    repeatChange(className) {
        let el = document.getElementsByClassName(className)[0];
        let originColor = true;

        if (!el) {
            return;
        }

        setInterval(() => {
            if (originColor) {
                el.classList.add('is-red');
            } else {
                el.classList.remove('is-red');
            }
            originColor = !originColor;
        }, 2000);
    }
}
