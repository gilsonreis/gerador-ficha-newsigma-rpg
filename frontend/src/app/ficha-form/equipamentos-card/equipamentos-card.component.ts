import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Equipment {
  nome: string;
  tipo: string;
  danoDefesa: string;
  observacao: string;
}

@Component({
  selector: 'app-equipamentos-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './equipamentos-card.component.html',
})
export class EquipamentosCardComponent implements OnInit {
  @Output() equipamentosChange = new EventEmitter<Equipment[]>();

  equipamentos: Equipment[] = [this.novoEquipamento()];

  ngOnInit() {
    this.emitir();
  }

  adicionar() {
    if (this.equipamentos.length < 13) {
      this.equipamentos.push(this.novoEquipamento());
      this.emitir();
    }
  }

  remover(index: number) {
    this.equipamentos.splice(index, 1);
    this.emitir();
  }

  onChange() {
    this.emitir();
  }

  private novoEquipamento(): Equipment {
    return { nome: '', tipo: '', danoDefesa: '', observacao: '' };
  }

  private emitir() {
    this.equipamentosChange.emit(this.equipamentos.map(e => ({ ...e })));
  }
}
