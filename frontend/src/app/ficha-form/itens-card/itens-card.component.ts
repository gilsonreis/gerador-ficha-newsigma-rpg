import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-itens-card',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './itens-card.component.html',
  styleUrl: './itens-card.component.scss',
})
export class ItensCardComponent implements OnInit {
  @Output() itensChange = new EventEmitter<string[]>();

  itens: string[] = [''];

  ngOnInit() {
    this.emitir();
  }

  adicionarItem() {
    if (this.itens.length < 11) {
      this.itens.push('');
      this.emitir();
    }
  }

  removerItem(index: number) {
    this.itens.splice(index, 1);
    this.emitir();
  }

  onItemChange() {
    this.emitir();
  }

  private emitir() {
    this.itensChange.emit([...this.itens]);
  }
}
