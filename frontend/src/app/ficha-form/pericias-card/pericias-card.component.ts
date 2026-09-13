import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import {
  PERICIAS_LIST,
  PericiaData,
  ARQUETIPO_PERICIAS,
  PericiaValor,
  ResumoPontosPericias,
  calcularResumoPontos,
} from './pericias.data';

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

  get arquetipo(): string {
    return this.periciasGroup?.parent?.get('arquetipoPersonagem')?.value || '';
  }

  get nivelPersonagem(): number {
    return Number(this.periciasGroup?.parent?.get('nivelPersonagem')?.value ?? 1);
  }

  get resumoPontos(): ResumoPontosPericias {
    const val = this.periciasGroup?.getRawValue() || {};
    return calcularResumoPontos(val, this.arquetipo, this.nivelPersonagem);
  }

  get totalNegativosManuais(): number {
    return this.resumoPontos.negativosManuais;
  }

  get pontosDisponiveis(): number {
    return this.resumoPontos.pontosDisponiveis;
  }

  get pontosRestantes(): number {
    return this.resumoPontos.pontosRestantes;
  }

  isArchetypeSkill(key: string): boolean {
    const config = ARQUETIPO_PERICIAS[this.arquetipo];
    return !!(config && config[key]);
  }

  isV1Locked(key: string): boolean {
    const config = ARQUETIPO_PERICIAS[this.arquetipo];
    return !!(config && config[key] && config[key].v1 !== '');
  }

  isV2Locked(key: string): boolean {
    const config = ARQUETIPO_PERICIAS[this.arquetipo];
    return !!(config && config[key] && config[key].v2 === '+');
  }

  clicarV1(key: string) {
    if (this.isV1Locked(key)) return;

    const ctrl = this.periciasGroup.get(key);
    if (!ctrl) return;
    const atual = ctrl.value as { v1: PericiaValor; v2: PericiaValor };
    let novoV1 = atual.v1;

    if (atual.v1 === '') {
      if (this.pontosRestantes > 0) {
        novoV1 = '+';
      } else if (this.totalNegativosManuais < 2) {
        novoV1 = '-';
      }
    } else if (atual.v1 === '+') {
      if (this.totalNegativosManuais < 2) {
        novoV1 = '-';
      } else {
        novoV1 = '';
      }
    } else if (atual.v1 === '-') {
      novoV1 = '';
    }

    const novoV2 = (atual.v2 && atual.v2 === novoV1) ? novoV1 : '';
    ctrl.setValue({ v1: novoV1, v2: novoV2 });
  }

  clicarV2(key: string) {
    if (this.isV2Locked(key)) return;

    const ctrl = this.periciasGroup.get(key);
    if (!ctrl) return;
    const atual = ctrl.value as { v1: PericiaValor; v2: PericiaValor };
    
    if (atual.v1 === '') return; // Nível 2 exige Nível 1 preenchido

    let novoV2 = atual.v2;
    if (atual.v2 === '') {
      if (atual.v1 === '+') {
        if (this.pontosRestantes > 0) novoV2 = '+';
      } else if (atual.v1 === '-') {
        if (this.totalNegativosManuais < 2) novoV2 = '-';
      }
    } else {
      novoV2 = '';
    }
    ctrl.setValue({ ...atual, v2: novoV2 });
  }

  getV1(key: string): PericiaValor {
    return this.periciasGroup?.get(key)?.value?.v1 ?? '';
  }

  getV2(key: string): PericiaValor {
    return this.periciasGroup?.get(key)?.value?.v2 ?? '';
  }

  corClasseV1(key: string): string {
    const valor = this.getV1(key);
    if (this.isV1Locked(key)) {
      if (valor === '+') return 'bg-indigo-600 text-white cursor-not-allowed opacity-90 shadow-inner';
      if (valor === '-') return 'bg-rose-600 text-white cursor-not-allowed opacity-90 shadow-inner';
    }
    if (valor === '+') return 'bg-green-500 text-white cursor-pointer hover:bg-green-600 shadow-sm';
    if (valor === '-') return 'bg-red-500 text-white cursor-pointer hover:bg-red-600 shadow-sm';
    return 'bg-slate-200 text-slate-500 cursor-pointer hover:bg-slate-300';
  }

  corClasseV2(key: string): string {
    const v1 = this.getV1(key);
    const v2 = this.getV2(key);
    if (this.isV2Locked(key)) {
      return 'bg-indigo-600 text-white cursor-not-allowed opacity-90 shadow-inner';
    }
    if (v1 === '') return 'bg-slate-100 text-slate-300 cursor-not-allowed opacity-50';
    if (v2 === '+') return 'bg-green-500 text-white cursor-pointer hover:bg-green-600 shadow-sm';
    if (v2 === '-') return 'bg-red-500 text-white cursor-pointer hover:bg-red-600 shadow-sm';
    return 'bg-slate-200 text-slate-500 cursor-pointer hover:bg-slate-300';
  }

  getTitleV1(key: string): string {
    const valor = this.getV1(key);
    if (this.isV1Locked(key)) {
      return valor === '+' ? 'Nível 1: Bônus de Arquétipo (+)' : 'Nível 1: Penalidade de Arquétipo (-)';
    }
    return 'Nível 1: ' + (valor || 'neutro');
  }

  getTitleV2(key: string): string {
    const valor = this.getV2(key);
    if (this.isV2Locked(key)) {
      return 'Nível 2: Bônus de Arquétipo (+)';
    }
    return 'Nível 2: ' + (valor || 'neutro');
  }
}
