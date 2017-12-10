import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../shared';
import { filter } from 'lodash';

class Variant {
  selected = false;
  text: string;
  id: string;

  constructor(public data: any, private parent: QuestionComponent) {
      this.id = data.id;
      this.text = data.text;
  }

  select() {
    this.parent.onSelect();
    this.selected = !this.selected;
  }
}

@Component({
  selector: 'question',
  templateUrl: './question.template.html',
  styleUrls: ['./question.style.scss']
})
export class QuestionComponent implements OnInit {
  @Input() activeQuestion: any;

  type: string;
  text: string;
  id: number;
  variants: Variant[];

  constructor(private api: ApiService) { }

  ngOnInit() {
      this.activeQuestion.subscribe(activeQuestion => {
          if (activeQuestion.id) {
              this.variants = this.getVariants(activeQuestion.variants);
              this.type = activeQuestion.type;
              this.text = activeQuestion.text;
              this.id = activeQuestion.id;
          }
      });
  }

  getVariants(variants: any) {
    return variants.map(v => new Variant(v, this));
  }

  onSelect() {
    if (this.type === 'radio') {
       for (let variant of this.variants) {
          variant.selected = false;
       }
    }
  }

  commit() {
    let answersIds = filter(this.variants, item => item.selected)
        .map(item => item.id)
        .join(',');

        this.api.check(this.id, answersIds);
    }

    hasSelected() {
        return this.variants ? this.variants
            .map(variant => variant.selected)
            .reduce((a, b) => a || b, false) : false;
    }
}
