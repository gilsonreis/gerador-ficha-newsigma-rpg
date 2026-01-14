import { Component } from '@angular/core';
import {Dice6, LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-recursos-card',
  imports: [LucideAngularModule],
  templateUrl: './recursos-card.component.html',
  styleUrl: './recursos-card.component.scss'
})
export class RecursosCardComponent {
  icons = { Dice6 };

  protected rolarEstamina() {

  }

  protected rolarDinheiro() {

  }

  protected rolarPV() {

  }
}
