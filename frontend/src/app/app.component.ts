import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FichaFormComponent} from './ficha-form/ficha-form.component';

@Component({
  selector: 'app-root',
  imports: [
    FichaFormComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
