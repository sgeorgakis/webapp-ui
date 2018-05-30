import { Component } from '@angular/core';

import { TITLE } from '../assets/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = TITLE;
}
