import { Component } from '@angular/core';
import {DadosPersonagemCardComponent} from './dados-personagem-card/dados-personagem-card.component';
import {AtributosCardComponent} from './atributos-card/atributos-card.component';
import {RecursosCardComponent} from './recursos-card/recursos-card.component';
import {PericiasCardComponent} from './pericias-card/pericias-card.component';
import {ItensCardComponent} from './itens-card/itens-card.component';
import {EquipamentosCardComponent} from './equipamentos-card/equipamentos-card.component';

@Component({
  selector: 'app-ficha-form',
  imports: [
    DadosPersonagemCardComponent,
    AtributosCardComponent,
    RecursosCardComponent,
    PericiasCardComponent,
    ItensCardComponent,
    EquipamentosCardComponent
  ],
  templateUrl: './ficha-form.component.html',
  styleUrl: './ficha-form.component.scss'
})
export class FichaFormComponent {

}
