import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Dice6, LucideAngularModule } from 'lucide-angular';

export const ARQUETIPO_RECURSOS: Record<string, { pvBase: number, pvDices: number, estBase: number, estDices: number }> = {
  'Combatente': { pvBase: 15, pvDices: 2, estBase: 5, estDices: 1 },
  'Especialista': { pvBase: 10, pvDices: 1, estBase: 8, estDices: 2 },
  'Explorador': { pvBase: 12, pvDices: 1, estBase: 7, estDices: 2 },
  'Astuto': { pvBase: 10, pvDices: 1, estBase: 8, estDices: 2 },
  'Místico': { pvBase: 5, pvDices: 1, estBase: 10, estDices: 2 },
  'Artista': { pvBase: 8, pvDices: 1, estBase: 9, estDices: 2 },
};

@Component({
  selector: 'app-recursos-card',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './recursos-card.component.html',
  styleUrl: './recursos-card.component.scss',
})
export class RecursosCardComponent {
  @Input() form!: FormGroup;
  icons = { Dice6 };

  get arquetipo(): string {
    return this.form.get('arquetipoPersonagem')?.value;
  }

  get nivel(): number {
    return Number(this.form.get('nivelPersonagem')?.value ?? 1);
  }

  get dadosArquetipo() {
    return this.arquetipo ? ARQUETIPO_RECURSOS[this.arquetipo] : null;
  }

  get formulaPV(): string {
    const r = this.dadosArquetipo;
    if (!r) return 'Requer Arquétipo';
    const totalDices = r.pvDices + (this.nivel - 1);
    return `${r.pvBase} + ${totalDices}D8`;
  }

  get formulaEstamina(): string {
    const r = this.dadosArquetipo;
    if (!r) return 'Requer Arquétipo';
    const totalDices = r.estDices + (this.nivel - 1);
    return `${r.estBase} + ${totalDices}D8`;
  }

  private d8(): number {
    return Math.ceil(Math.random() * 8);
  }

  private rolarD8s(qtd: number): number {
    let result = 0;
    for(let i=0; i < qtd; i++) result += this.d8();
    return result;
  }

  rolarPV() {
    if (this.form.get('pontosDeVida')?.value) return;
    const r = this.dadosArquetipo;
    if (!r) {
      alert("⚠️ Selecione um Arquétipo primeiro, nos Dados do Personagem!");
      return;
    }
    const totalDices = r.pvDices + (this.nivel - 1);
    const val = r.pvBase + this.rolarD8s(totalDices);
    this.form.get('pontosDeVida')?.setValue(val);
  }

  rolarEstamina() {
    if (this.form.get('pontosDeInstamina')?.value) return;
    const r = this.dadosArquetipo;
    if (!r) {
      alert("⚠️ Selecione um Arquétipo primeiro, nos Dados do Personagem!");
      return;
    }
    const totalDices = r.estDices + (this.nivel - 1);
    const val = r.estBase + this.rolarD8s(totalDices);
    this.form.get('pontosDeInstamina')?.setValue(val);
  }

  /** Dinheiro = 1D8 × 10 (conforme manual) */
  rolarDinheiro() {
    if (this.form.get('dinheiro')?.value) return;
    const val = this.d8() * 10;
    this.form.get('dinheiro')?.setValue(val);
  }

  /** Sorte: Mesma regra dos atributos (8 a 12), travada após rodar */
  rolarSorte() {
    if (this.form.get('sorte')?.value) return; // Prevent re-rolling manually here
    const roll1 = this.d8();
    const roll2 = this.d8();
    let val = roll1 + roll2;
    if (val < 8) val = 8;
    if (val > 12) val = 12;
    this.form.get('sorte')?.setValue(val);
  }
}

