import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { LucideAngularModule, Dice6 } from 'lucide-angular';

@Component({
  selector: 'app-atributos-card',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './atributos-card.component.html',
  styleUrl: './atributos-card.component.scss',
})
export class AtributosCardComponent {
  @Input() form!: FormGroup;
  icons = { Dice6 };

  rolarAtributo(campo: string) {
    if (this.form.get(campo)?.value) return; // Trava a re-rolagem
    
    const roll1 = Math.ceil(Math.random() * 8);
    const roll2 = Math.ceil(Math.random() * 8);
    let val = roll1 + roll2;
    
    if (val < 8) val = 8;
    if (val > 12) val = 12;
    
    this.form.get(campo)?.setValue(val);
  }
}
