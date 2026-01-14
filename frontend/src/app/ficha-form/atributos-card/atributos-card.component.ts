import { Component } from '@angular/core';
import { LucideAngularModule, Dice6 } from 'lucide-angular';


@Component({
  selector: 'app-atributos-card',
  imports: [LucideAngularModule],
  templateUrl: './atributos-card.component.html',
  styleUrl: './atributos-card.component.scss'
})
export class AtributosCardComponent {
  icons = { Dice6 };

  constructor() { }

  rolarAtributo(atributo: string) {}
}
