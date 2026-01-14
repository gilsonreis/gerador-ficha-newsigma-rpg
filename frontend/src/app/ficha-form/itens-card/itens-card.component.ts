import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-itens-card',
  imports: [
    FormsModule,CommonModule
  ],
  templateUrl: './itens-card.component.html',
  styleUrl: './itens-card.component.scss'
})
export class ItensCardComponent {
  itens: string[] = ['']; // começa com uma linha vazia

  adicionarItem() {
    this.itens.push('');
  }

  removerItem(index: number) {
    this.itens.splice(index, 1);
  }
}
