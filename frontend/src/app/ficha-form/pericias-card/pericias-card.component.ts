import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';

export class Pericia {
  constructor(
    public nome: string,
    public valor: number = 0
  ) {}
}

@Component({
  selector: 'app-pericias-card',
  imports: [CommonModule],
  templateUrl: './pericias-card.component.html',
  styleUrl: './pericias-card.component.scss'
})
export class PericiasCardComponent {
  private _pericia: any;

  public pericias: Pericia[] = [
    new Pericia('Arrombamento (DES, FOR)'),
    new Pericia('Artes Marciais (FOR)'),
    new Pericia('Atletismo (CON)'),
    new Pericia('Camuflagem (DES)'),
    new Pericia('Conhecimento Geral (INT)'),
    new Pericia('Criação (INT)'),
    new Pericia('Decifrar (INT)'),
    new Pericia('Disfarce (CAR)'),
    new Pericia('Escalada (DES, CON)'),
    new Pericia('Estratégia (INT)'),
    new Pericia('Furtividade (DES)'),
    new Pericia('Intimidação (CAR, FOR)'),
    new Pericia('Intuição (INT)'),
    new Pericia('Lábia (CAR)'),
    new Pericia('Levantamento (FOR)'),
    new Pericia('Medicina (INT)'),
    new Pericia('Mira (DES)'),
    new Pericia('Negociação (CAR, INT)'),
    new Pericia('Ocultismo (INT, CAR)'),
    new Pericia('Percepção (INT, DES)'),
    new Pericia('Persuasão (CAR, INT)'),
    new Pericia('Pilotagem (DES)'),
    new Pericia('Resistência (COM, FOR)'),
    new Pericia('Sobrevivência (INT)'),
  ];

  protected diminuir(pericia : Pericia) {
    pericia.valor--;

  }

  protected aumentar(pericia : Pericia) {
    pericia.valor++;
  }
}
