import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PericiasCardComponent } from './pericias-card.component';
import {
  ARQUETIPO_PERICIAS,
  PERICIAS_LIST,
  calcularResumoPontos,
} from './pericias.data';

describe('Pericias e Pacote Vocacional', () => {
  describe('Mapeamento dos Arquétipos (ARQUETIPO_PERICIAS)', () => {
    it('deve mapear Combatente corretamente (+2 Artes Marciais, +1 Atletismo, -1 Lábia)', () => {
      const cfg = ARQUETIPO_PERICIAS['Combatente'];
      expect(cfg).toBeDefined();
      expect(cfg['ARTES_MARCIAIS']).toEqual({ v1: '+', v2: '+' });
      expect(cfg['ATLETISMO']).toEqual({ v1: '+', v2: '' });
      expect(cfg['LABIA']).toEqual({ v1: '-', v2: '' });
    });

    it('deve mapear Especialista corretamente (+2 Decifrar, +1 Criação, -1 Atletismo)', () => {
      const cfg = ARQUETIPO_PERICIAS['Especialista'];
      expect(cfg).toBeDefined();
      expect(cfg['DECIFRAR']).toEqual({ v1: '+', v2: '+' });
      expect(cfg['CRIACAO']).toEqual({ v1: '+', v2: '' });
      expect(cfg['ATLETISMO']).toEqual({ v1: '-', v2: '' });
    });

    it('deve mapear Explorador corretamente (+2 Sobrevivência, +1 Escalada, -1 Negociação)', () => {
      const cfg = ARQUETIPO_PERICIAS['Explorador'];
      expect(cfg).toBeDefined();
      expect(cfg['SOBREVIVENCIA']).toEqual({ v1: '+', v2: '+' });
      expect(cfg['ESCALADA']).toEqual({ v1: '+', v2: '' });
      expect(cfg['NEGOCIACAO']).toEqual({ v1: '-', v2: '' });
    });

    it('deve mapear Astuto corretamente (+2 Disfarce, +1 Persuasão, -1 Levantamento)', () => {
      const cfg = ARQUETIPO_PERICIAS['Astuto'];
      expect(cfg).toBeDefined();
      expect(cfg['DISFARCE']).toEqual({ v1: '+', v2: '+' });
      expect(cfg['PERSUASAO']).toEqual({ v1: '+', v2: '' });
      expect(cfg['LEVANTAMENTO']).toEqual({ v1: '-', v2: '' });
    });

    it('deve mapear Místico corretamente (+2 Ocultismo, +1 Intuição, -1 Levantamento)', () => {
      const cfg = ARQUETIPO_PERICIAS['Místico'];
      expect(cfg).toBeDefined();
      expect(cfg['OCULTISMO']).toEqual({ v1: '+', v2: '+' });
      expect(cfg['INTUICAO']).toEqual({ v1: '+', v2: '' });
      expect(cfg['LEVANTAMENTO']).toEqual({ v1: '-', v2: '' });
    });

    it('deve mapear Artista corretamente (+2 Criação, +1 Persuasão, -1 Resistência)', () => {
      const cfg = ARQUETIPO_PERICIAS['Artista'];
      expect(cfg).toBeDefined();
      expect(cfg['CRIACAO']).toEqual({ v1: '+', v2: '+' });
      expect(cfg['PERSUASAO']).toEqual({ v1: '+', v2: '' });
      expect(cfg['RESISTENCIA']).toEqual({ v1: '-', v2: '' });
    });
  });

  describe('calcularResumoPontos', () => {
    function criarPericiasIniciais(arquetipo: string) {
      const pericias: Record<string, { v1: string; v2: string }> = {};
      PERICIAS_LIST.forEach(p => {
        pericias[p.key] = { v1: '', v2: '' };
      });
      const cfg = ARQUETIPO_PERICIAS[arquetipo] || {};
      Object.entries(cfg).forEach(([k, v]) => {
        pericias[k] = { v1: v.v1, v2: v.v2 };
      });
      return pericias;
    }

    it('deve manter 3 pontos livres restantes logo ao selecionar qualquer arquétipo no nível 1', () => {
      const arquetipos = ['Combatente', 'Especialista', 'Explorador', 'Astuto', 'Místico', 'Artista'];
      for (const arq of arquetipos) {
        const pericias = criarPericiasIniciais(arq);
        const resumo = calcularResumoPontos(pericias, arq, 1);
        expect(resumo.pontosDisponiveis).toBe(3);
        expect(resumo.pontosComprados).toBe(0);
        expect(resumo.negativosManuais).toBe(0);
        expect(resumo.pontosRestantes).toBe(3);
      }
    });

    it('deve adicionar 1 ponto disponível para cada nível acima do nível 1', () => {
      const pericias = criarPericiasIniciais('Combatente');
      const resumoNivel3 = calcularResumoPontos(pericias, 'Combatente', 3);
      expect(resumoNivel3.pontosDisponiveis).toBe(5); // 3 base + 2 de nível
      expect(resumoNivel3.pontosRestantes).toBe(5);
    });

    it('deve contabilizar negativa manual e adicionar +1 ponto livre sem contar a negativa do arquétipo', () => {
      const pericias = criarPericiasIniciais('Combatente');
      // Lábia já tem -1 do arquétipo. Adicionamos negativa manual em Furtividade
      pericias['FURTIVIDADE'] = { v1: '-', v2: '' };
      const resumo = calcularResumoPontos(pericias, 'Combatente', 1);
      expect(resumo.negativosManuais).toBe(1);
      expect(resumo.pontosDisponiveis).toBe(4); // 3 base + 1 manual
      expect(resumo.pontosRestantes).toBe(4);
    });

    it('deve permitir até 2 negativas manuais adicionando +2 pontos', () => {
      const pericias = criarPericiasIniciais('Combatente');
      pericias['FURTIVIDADE'] = { v1: '-', v2: '' };
      pericias['CAMUFLAGEM'] = { v1: '-', v2: '' };
      const resumo = calcularResumoPontos(pericias, 'Combatente', 1);
      expect(resumo.negativosManuais).toBe(2);
      expect(resumo.pontosDisponiveis).toBe(5);
      expect(resumo.pontosRestantes).toBe(5);
    });

    it('deve contabilizar compra de perícia normal e deduzir dos pontos restantes', () => {
      const pericias = criarPericiasIniciais('Combatente');
      pericias['FURTIVIDADE'] = { v1: '+', v2: '' }; // comprou 1 ponto
      const resumo = calcularResumoPontos(pericias, 'Combatente', 1);
      expect(resumo.pontosComprados).toBe(1);
      expect(resumo.pontosRestantes).toBe(2);
    });

    it('deve permitir avançar a perícia +1 do arquétipo para +2 custando 1 ponto', () => {
      const pericias = criarPericiasIniciais('Combatente');
      // Atletismo veio +1 do arquétipo (v1: '+', v2: ''). Jogador avança para +2
      pericias['ATLETISMO'] = { v1: '+', v2: '+' };
      const resumo = calcularResumoPontos(pericias, 'Combatente', 1);
      expect(resumo.pontosComprados).toBe(1);
      expect(resumo.pontosRestantes).toBe(2);
    });

    it('não deve cobrar pontos pela perícia +2 inicial do arquétipo', () => {
      const pericias = criarPericiasIniciais('Combatente');
      // Artes Marciais tem v1: '+', v2: '+' do arquétipo
      const resumo = calcularResumoPontos(pericias, 'Combatente', 1);
      expect(resumo.pontosComprados).toBe(0);
      expect(resumo.pontosRestantes).toBe(3);
    });
  });

  describe('PericiasCardComponent', () => {
    let component: PericiasCardComponent;
    let fixture: ComponentFixture<PericiasCardComponent>;
    let fb: FormBuilder;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [PericiasCardComponent, ReactiveFormsModule],
      }).compileComponents();

      fb = new FormBuilder();
      fixture = TestBed.createComponent(PericiasCardComponent);
      component = fixture.componentInstance;

      const parentForm = fb.group({
        arquetipoPersonagem: ['Combatente'],
        nivelPersonagem: ['1'],
        pericias: fb.group(
          Object.fromEntries(
            PERICIAS_LIST.map(p => [p.key, fb.group({ v1: [''], v2: [''] })])
          )
        ),
      });

      // Aplica pacote vocacional inicial de Combatente
      const periciasGroup = parentForm.get('pericias') as any;
      const cfg = ARQUETIPO_PERICIAS['Combatente'];
      Object.entries(cfg).forEach(([k, v]) => {
        periciasGroup.get(k).setValue({ v1: v.v1, v2: v.v2 });
      });

      component.periciasGroup = periciasGroup;
      fixture.detectChanges();
    });

    it('deve criar o componente e carregar estado inicial do arquétipo', () => {
      expect(component).toBeTruthy();
      expect(component.arquetipo).toBe('Combatente');
      expect(component.pontosDisponiveis).toBe(3);
      expect(component.pontosRestantes).toBe(3);
      expect(component.totalNegativosManuais).toBe(0);
    });

    it('deve identificar perícias do arquétipo e bloqueios', () => {
      expect(component.isArchetypeSkill('ARTES_MARCIAIS')).toBeTrue();
      expect(component.isV1Locked('ARTES_MARCIAIS')).toBeTrue();
      expect(component.isV2Locked('ARTES_MARCIAIS')).toBeTrue();

      expect(component.isArchetypeSkill('ATLETISMO')).toBeTrue();
      expect(component.isV1Locked('ATLETISMO')).toBeTrue();
      expect(component.isV2Locked('ATLETISMO')).toBeFalse();

      expect(component.isArchetypeSkill('LABIA')).toBeTrue();
      expect(component.isV1Locked('LABIA')).toBeTrue();
      expect(component.isV2Locked('LABIA')).toBeFalse();

      expect(component.isArchetypeSkill('FURTIVIDADE')).toBeFalse();
      expect(component.isV1Locked('FURTIVIDADE')).toBeFalse();
      expect(component.isV2Locked('FURTIVIDADE')).toBeFalse();
    });

    it('não deve permitir alterar V1 de perícias bloqueadas do arquétipo', () => {
      component.clicarV1('ARTES_MARCIAIS');
      expect(component.getV1('ARTES_MARCIAIS')).toBe('+');

      component.clicarV1('LABIA');
      expect(component.getV1('LABIA')).toBe('-');
    });

    it('não deve permitir alterar V2 de perícias +2 do arquétipo', () => {
      component.clicarV2('ARTES_MARCIAIS');
      expect(component.getV2('ARTES_MARCIAIS')).toBe('+');
    });

    it('deve permitir evoluir V2 da perícia +1 do arquétipo consumindo 1 ponto livre', () => {
      expect(component.getV2('ATLETISMO')).toBe('');
      expect(component.pontosRestantes).toBe(3);

      component.clicarV2('ATLETISMO');
      expect(component.getV2('ATLETISMO')).toBe('+');
      expect(component.pontosRestantes).toBe(2);

      // Clicar novamente deve desmarcar e devolver o ponto
      component.clicarV2('ATLETISMO');
      expect(component.getV2('ATLETISMO')).toBe('');
      expect(component.pontosRestantes).toBe(3);
    });

    it('deve permitir distribuir pontos em perícias normais e respeitar limite de negativas manuais', () => {
      // Compra Furtividade
      component.clicarV1('FURTIVIDADE');
      expect(component.getV1('FURTIVIDADE')).toBe('+');
      expect(component.pontosRestantes).toBe(2);

      // Adiciona 1 negativa manual em Camuflagem
      // Como pontosRestantes > 0, clicarV1 torna '+'. Clicar de novo torna '-'
      component.clicarV1('CAMUFLAGEM');
      expect(component.getV1('CAMUFLAGEM')).toBe('+');
      component.clicarV1('CAMUFLAGEM');
      expect(component.getV1('CAMUFLAGEM')).toBe('-');
      expect(component.totalNegativosManuais).toBe(1);
      expect(component.pontosDisponiveis).toBe(4); // 3 base + 1 manual

      // Adiciona 2ª negativa manual em Medicina
      component.clicarV1('MEDICINA');
      component.clicarV1('MEDICINA');
      expect(component.getV1('MEDICINA')).toBe('-');
      expect(component.totalNegativosManuais).toBe(2);
      expect(component.pontosDisponiveis).toBe(5);

      // Tentativa de 3ª negativa manual não deve permitir exceder limite de 2
      component.clicarV1('NEGOCIACAO'); // pontosRestantes > 0 -> vai para '+'
      expect(component.getV1('NEGOCIACAO')).toBe('+');
      component.clicarV1('NEGOCIACAO'); // como totalNegativosManuais == 2, vai para '' e não '-'
      expect(component.getV1('NEGOCIACAO')).toBe('');
      expect(component.totalNegativosManuais).toBe(2);
    });
  });
});
