import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Toast} from "primeng/toast";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    Toast,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'takussan-web';

  constructor() {
  }
}
