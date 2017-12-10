import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(
    private router: Router) {
  }

  startQuize() {
    this.router.navigate(['/quize']);
  }
}
