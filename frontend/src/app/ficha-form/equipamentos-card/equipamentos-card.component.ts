import { Component } from '@angular/core';
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
export class EquipamentosCardComponent {

  equipamentos: Equipment[] = [
    this.novoEquipamento(),
  ];

  adicionar() {
    this.equipamentos.push(this.novoEquipamento());
  }

  remover(index: number) {
    this.equipamentos.splice(index, 1);
  }

  private novoEquipamento(): Equipment {
    return {
      nome: '',
      tipo: '',
      danoDefesa: '',
      observacao: '',
    };
  }
}
