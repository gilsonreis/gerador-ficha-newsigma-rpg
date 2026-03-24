import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DadosPersonagemCardComponent } from './dados-personagem-card/dados-personagem-card.component';
import { AtributosCardComponent } from './atributos-card/atributos-card.component';
import { RecursosCardComponent } from './recursos-card/recursos-card.component';
import { PericiasCardComponent } from './pericias-card/pericias-card.component';
import { ItensCardComponent } from './itens-card/itens-card.component';
import { EquipamentosCardComponent } from './equipamentos-card/equipamentos-card.component';
import { FichaService, NewSigmaFichaRequest, PericiaInput } from '../services/ficha.service';
import { PERICIAS_LIST, ARQUETIPO_PERICIAS } from './pericias-card/pericias.data';

@Component({
  selector: 'app-ficha-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DadosPersonagemCardComponent,
    AtributosCardComponent,
    RecursosCardComponent,
    PericiasCardComponent,
    ItensCardComponent,
    EquipamentosCardComponent,
  ],
  templateUrl: './ficha-form.component.html',
  styleUrl: './ficha-form.component.scss',
})
export class FichaFormComponent implements OnInit {
  form: FormGroup;
  gerando = false;

  constructor(private fb: FormBuilder, private fichaService: FichaService) {
    this.form = this.fb.group({
      // Dados do personagem
      nomeJogador: [''],
      nomePersonagem: ['', Validators.required],
      sexoPersonagem: [''],
      idadePersonagem: [''],
      arquetipoPersonagem: [''],
      especializacaoPersonagem: [''],
      nivelPersonagem: ['1'],
      expPersonagem: ['0'],
      ambientacao: [''],
      campanha: [''],
      historiaPersonagem: [''],
      aparenciaFisica: [''],

      // Atributos (2D8: 8-12)
      atributoForca: [null],
      atributoDestreza: [null],
      atributoInteligencia: [null],
      atributoConstituicao: [null],
      atributoCarisma: [null],

      // Pontos
      pontosDeVida: [null],
      pontosDeInstamina: [null],
      dinheiro: [null],
      sorte: [null],

      // Perícias: Map<key, {v1, v2}>
      pericias: this.fb.group(
        Object.fromEntries(
          PERICIAS_LIST.map((p: any) => [
            p.key,
            this.fb.group({ v1: [''], v2: [''] }),
          ])
        )
      ),

      // Itens e equipamentos ficam nos sub-componentes via Output
    });
  }

  isCarregando = false;

  ngOnInit() {
    this.form.get('arquetipoPersonagem')?.valueChanges.subscribe(arquetipo => {
      // Se estamos carregando os dados salvos do localStorage, a gente ignora esse trigger
      // para não resetar as perícias que o usuário já tinha salvo!
      if (this.isCarregando || !arquetipo) return;
      
      const sugeridas = ARQUETIPO_PERICIAS[arquetipo] || [];
      const periciasForm = this.form.get('pericias') as FormGroup;
      
      Object.keys(periciasForm.controls).forEach((key: string) => {
        periciasForm.get(key)?.setValue({ v1: '', v2: '' });
      });

      sugeridas.forEach((key: string) => {
        periciasForm.get(key)?.setValue({ v1: '+', v2: '' });
      });
    });

    this.carregarDoLocalStorage();

    // Sempre que o form mudar, salvamos no localStorage
    this.form.valueChanges.subscribe(() => {
      if (!this.isCarregando) {
        this.salvarNoLocalStorage();
      }
    });
  }

  // --- PERSISTÊNCIA (LOCALSTORAGE) ---
  salvarNoLocalStorage() {
    const estado = {
      form: this.form.getRawValue(),
      rolagensRestantes: this.rolagensRestantes,
      valorRoladoExtra: this.valorRoladoExtra
    };
    localStorage.setItem('fichaSigmaState', JSON.stringify(estado));
  }

  carregarDoLocalStorage() {
    const salvo = localStorage.getItem('fichaSigmaState');
    if (salvo) {
      try {
        this.isCarregando = true;
        const estado = JSON.parse(salvo);
        if (estado.form) {
          this.form.patchValue(estado.form);
        }
        if (estado.rolagensRestantes !== undefined) this.rolagensRestantes = estado.rolagensRestantes;
        if (estado.valorRoladoExtra !== undefined) this.valorRoladoExtra = estado.valorRoladoExtra;
        
        // Timeout para permitir que a UI seja atualizada e o patchValue se propague sem acionar lógicas conflitantes
        setTimeout(() => this.isCarregando = false, 50);
      } catch (e) {
        console.error('Erro ao ler localStorage', e);
        this.isCarregando = false;
      }
    }
  }

  // --- LOGICA PARA ROLAGENS EXTRAS DOS ATRIBUTOS ---
  rolagensRestantes = 3;
  valorRoladoExtra: number | null = null;

  get atributosCompletos(): boolean {
    const v = this.form.getRawValue();
    return !!(v.atributoForca && v.atributoDestreza && v.atributoInteligencia &&
              v.atributoConstituicao && v.atributoCarisma && v.sorte);
  }

  rolarExtra() {
    if (this.rolagensRestantes <= 0 || this.valorRoladoExtra !== null) return;
    const roll1 = Math.ceil(Math.random() * 8);
    const roll2 = Math.ceil(Math.random() * 8);
    let val = roll1 + roll2;
    if (val < 8) val = 8;
    if (val > 12) val = 12;
    this.valorRoladoExtra = val;
    this.salvarNoLocalStorage();
  }

  aplicarRolagemExtra(campo: string) {
    if (this.valorRoladoExtra === null) return;
    this.form.get(campo)?.setValue(this.valorRoladoExtra);
    this.consumirRolagemExtra();
  }

  descartarRolagemExtra() {
    this.consumirRolagemExtra();
  }

  private consumirRolagemExtra() {
    this.valorRoladoExtra = null;
    this.rolagensRestantes--;
    this.salvarNoLocalStorage();
  }

  // Esses são coletados dos sub-componentes via @ViewChild
  itens: string[] = [];
  equipamentos: any[] = [];

  onItensChange(itens: string[]) {
    this.itens = itens;
  }

  onEquipamentosChange(equipamentos: any[]) {
    this.equipamentos = equipamentos;
  }

  rolar1D8(): number {
    return Math.ceil(Math.random() * 8);
  }

  get pontosSobrando(): number {
    const arquetipo = this.form.get('arquetipoPersonagem')?.value;
    if (!arquetipo) return 0;
    const locked = ARQUETIPO_PERICIAS[arquetipo] || [];
    
    const nivel = Number(this.form.get('nivelPersonagem')?.value ?? 1);

    const periciasRaw = this.form.get('pericias')?.value || {};
    let negativos = 0;
    let comprados = 0;

    for (const key of Object.keys(periciasRaw)) {
      const v = periciasRaw[key];
      if (v.v1 === '-') negativos++;
      if (v.v1 === '+' && !locked.includes(key)) comprados++;
      if (v.v2 === '+') comprados++;
    }

    const disponiveis = 3 + (nivel - 1) + negativos;
    return disponiveis - comprados;
  }

  get periciasValidas(): boolean {
    return this.pontosSobrando === 0;
  }

  gerarPdf() {
    if (this.gerando || !this.periciasValidas) return;
    this.gerando = true;

    const v = this.form.value;

    const periciasRaw = v.pericias as Record<string, { v1: string; v2: string }>;
    const pericias: Record<string, PericiaInput> = {};
    for (const key of Object.keys(periciasRaw)) {
      pericias[key] = {
        v1: (periciasRaw[key].v1 || '') as PericiaInput['v1'],
        v2: (periciasRaw[key].v2 || '') as PericiaInput['v2'],
      };
    }

    // Incluir as 4 perícias adicionais livres com chaves do backend
    pericias['PERICIA_ADICIONAL_1'] = { v1: '', v2: '' };
    pericias['PERICIA_ADICIONAL_2'] = { v1: '', v2: '' };
    pericias['PERICIA_ADICIONAL_3'] = { v1: '', v2: '' };
    pericias['PERICIA_ADICIONAL_4'] = { v1: '', v2: '' };

    const payload: NewSigmaFichaRequest = {
      nomeJogador: v.nomeJogador ?? '',
      nomePersonagem: v.nomePersonagem ?? '',
      sexoPersonagem: v.sexoPersonagem ?? '',
      idadePersonagem: String(v.idadePersonagem ?? ''),
      arquetipoPersonagem: v.arquetipoPersonagem ?? '',
      especializacaoPersonagem: v.especializacaoPersonagem ?? '',
      nivelPersonagem: String(v.nivelPersonagem ?? '1'),
      expPersonagem: String(v.expPersonagem ?? '0'),
      ambientacao: v.ambientacao ?? '',
      campanha: v.campanha ?? '',
      historiaPersonagem: v.historiaPersonagem ?? '',
      aparenciaFisica: v.aparenciaFisica ?? '',
      atributoForca: String(v.atributoForca ?? ''),
      atributoDestreza: String(v.atributoDestreza ?? ''),
      atributoInteligencia: String(v.atributoInteligencia ?? ''),
      atributoConstituicao: String(v.atributoConstituicao ?? ''),
      atributoCarisma: String(v.atributoCarisma ?? ''),
      pontosDeVida: String(v.pontosDeVida ?? ''),
      pontosDeInstamina: String(v.pontosDeInstamina ?? ''),
      dinheiro: String(v.dinheiro ?? ''),
      sorte: String(v.sorte ?? ''),
      pericias,
      items: this.itens.filter(i => i.trim() !== ''),
      equipamentos: this.equipamentos,
    };

    this.fichaService.gerarPdf(payload).subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
        this.gerando = false;
      },
      error: (err) => {
        console.error('Erro ao gerar PDF', err);
        alert('Erro ao gerar a ficha. Verifique se o servidor está rodando.');
        this.gerando = false;
      },
    });
  }
}
