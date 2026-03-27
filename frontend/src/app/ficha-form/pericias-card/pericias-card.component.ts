import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { PERICIAS_LIST, PericiaData, ARQUETIPO_PERICIAS } from './pericias.data';

type PericiaValor = '' | '+' | '-';

@Component({
  selector: 'app-pericias-card',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pericias-card.component.html',
  styleUrl: './pericias-card.component.scss',
})
export class PericiasCardComponent {
  @Input() periciasGroup!: FormGroup;

  pericias: PericiaData[] = PERICIAS_LIST;

  get lockedKeys(): string[] {
    const arquetipo = this.periciasGroup.parent?.get('arquetipoPersonagem')?.value;
    return ARQUETIPO_PERICIAS[arquetipo] || [];
  }

  get totalNegativos(): number {
    let count = 0;
    const val = this.periciasGroup.getRawValue();
    for (const key in val) {
      if (val[key].v1 === '-') count++;
      if (val[key].v2 === '-') count++;
    }
    return count;
  }

  get totalComprados(): number {
    let count = 0;
    const locked = this.lockedKeys;
    const val = this.periciasGroup.getRawValue();
    for (const key in val) {
      if (val[key].v1 === '+' && !locked.includes(key)) count++;
      if (val[key].v2 === '+') count++;
    }
    return count;
  }

  get nivelPersonagem(): number {
    return Number(this.periciasGroup.parent?.get('nivelPersonagem')?.value ?? 1);
  }

  get pontosDisponiveis(): number {
    // 3 base + bônus de nível + pontos de desvantagem (negativos)
    return 3 + (this.nivelPersonagem - 1) + this.totalNegativos;
  }

  get pontosRestantes(): number {
    return this.pontosDisponiveis - this.totalComprados;
  }

  isLocked(key: string): boolean {
    return this.lockedKeys.includes(key);
  }

  clicarV1(key: string) {
    if (this.isLocked(key)) return; // Sugeridas não podem ser desmarcadas do Nível 1

    const ctrl = this.periciasGroup.get(key);
    if (!ctrl) return;
    const atual = ctrl.value as { v1: PericiaValor; v2: PericiaValor };
    let novoV1 = atual.v1;

    if (atual.v1 === '') {
      if (this.pontosRestantes > 0) novoV1 = '+';
      else if (this.totalNegativos < 2) novoV1 = '-';
    } else if (atual.v1 === '+') {
      if (this.totalNegativos < 2) novoV1 = '-';
      else novoV1 = '';
    } else if (atual.v1 === '-') {
      novoV1 = '';
    }

    const novoV2 = (atual.v2 && atual.v2 === novoV1) ? novoV1 : '';
    ctrl.setValue({ v1: novoV1, v2: novoV2 });
  }

  clicarV2(key: string) {
    const ctrl = this.periciasGroup.get(key);
    if (!ctrl) return;
    const atual = ctrl.value as { v1: PericiaValor; v2: PericiaValor };
    
    if (atual.v1 === '') return; // Nível 2 exige Nível 1 preenchido

    let novoV2 = atual.v2;
    if (atual.v2 === '') {
      if (atual.v1 === '+') {
        if (this.pontosRestantes > 0) novoV2 = '+';
      } else if (atual.v1 === '-') {
        if (this.totalNegativos < 2) novoV2 = '-';
      }
    } else {
      novoV2 = '';
    }
    ctrl.setValue({ ...atual, v2: novoV2 });
  }

  getV1(key: string): PericiaValor {
    return this.periciasGroup.get(key)?.value?.v1 ?? '';
  }

  getV2(key: string): PericiaValor {
    return this.periciasGroup.get(key)?.value?.v2 ?? '';
  }

  corClasseV1(key: string): string {
    const valor = this.getV1(key);
    if (this.isLocked(key)) return 'bg-indigo-600 text-white cursor-not-allowed opacity-90 shadow-inner';
    if (valor === '+') return 'bg-green-500 text-white cursor-pointer hover:bg-green-600 shadow-sm';
    if (valor === '-') return 'bg-red-500 text-white cursor-pointer hover:bg-red-600 shadow-sm';
    return 'bg-slate-200 text-slate-500 cursor-pointer hover:bg-slate-300';
  }

  corClasseV2(key: string): string {
    const v1 = this.getV1(key);
    const v2 = this.getV2(key);
    if (v1 === '') return 'bg-slate-100 text-slate-300 cursor-not-allowed opacity-50';
    if (v2 === '+') return 'bg-green-500 text-white cursor-pointer hover:bg-green-600 shadow-sm';
    if (v2 === '-') return 'bg-red-500 text-white cursor-pointer hover:bg-red-600 shadow-sm';
    return 'bg-slate-200 text-slate-500 cursor-pointer hover:bg-slate-300';
  }
}
