import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dados-personagem-card',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dados-personagem-card.component.html',
  styleUrl: './dados-personagem-card.component.scss',
})
export class DadosPersonagemCardComponent {
  @Input() form!: FormGroup;
}
