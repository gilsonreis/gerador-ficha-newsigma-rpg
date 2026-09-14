import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FichaFormComponent } from './ficha-form.component';

describe('FichaFormComponent - Troca de Arquétipo', () => {
  let component: FichaFormComponent;
  let fixture: ComponentFixture<FichaFormComponent>;

  beforeEach(async () => {
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [FichaFormComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FichaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('ao selecionar Combatente, deve aplicar pacote e manter 3 pontos livres restantes', () => {
    component.form.get('arquetipoPersonagem')?.setValue('Combatente');

    const pericias = component.form.get('pericias')?.value;
    expect(pericias['ARTES_MARCIAIS']).toEqual({ v1: '+', v2: '+' });
    expect(pericias['ATLETISMO']).toEqual({ v1: '+', v2: '' });
    expect(pericias['LABIA']).toEqual({ v1: '-', v2: '' });

    expect(component.pontosSobrando).toBe(3);
    expect(component.periciasValidas).toBeFalse(); // precisa distribuir os 3 pontos para validar
  });

  it('ao trocar de Combatente para Especialista, deve limpar as perícias anteriores e aplicar novo pacote', () => {
    component.form.get('arquetipoPersonagem')?.setValue('Combatente');

    // Jogador compra 1 ponto em Furtividade
    component.form.get('pericias.FURTIVIDADE')?.setValue({ v1: '+', v2: '' });
    expect(component.pontosSobrando).toBe(2);

    // Troca para Especialista
    component.form.get('arquetipoPersonagem')?.setValue('Especialista');

    const pericias = component.form.get('pericias')?.value;
    // Perícias de Combatente e Furtividade devem ter sido limpas
    expect(pericias['ARTES_MARCIAIS']).toEqual({ v1: '', v2: '' });
    expect(pericias['LABIA']).toEqual({ v1: '', v2: '' });
    expect(pericias['FURTIVIDADE']).toEqual({ v1: '', v2: '' });

    // Novo pacote de Especialista aplicado
    expect(pericias['DECIFRAR']).toEqual({ v1: '+', v2: '+' });
    expect(pericias['CRIACAO']).toEqual({ v1: '+', v2: '' });
    expect(pericias['ATLETISMO']).toEqual({ v1: '-', v2: '' });

    // Saldo volta a 3 pontos livres
    expect(component.pontosSobrando).toBe(3);
  });

  it('deve salvar apenas os dados sorteados no localStorage, ignorando nome e outros dados textuais', () => {
    component.form.patchValue({
      nomePersonagem: 'Guerreiro Lendário',
      nomeJogador: 'Gilson',
      ambientacao: 'Medieval',
      atributoForca: 11,
      atributoDestreza: 10,
      atributoInteligencia: 9,
      atributoConstituicao: 12,
      atributoCarisma: 8,
      pontosDeVida: 25,
      pontosDeInstamina: 12,
      dinheiro: 70,
      sorte: 10,
    });

    component.salvarNoLocalStorage();

    const salvo = JSON.parse(localStorage.getItem('fichaSigmaState') || '{}');
    expect(salvo.sorteados).toBeDefined();
    // Campos sorteados devem estar salvos
    expect(salvo.sorteados.atributoForca).toBe(11);
    expect(salvo.sorteados.atributoDestreza).toBe(10);
    expect(salvo.sorteados.atributoInteligencia).toBe(9);
    expect(salvo.sorteados.atributoConstituicao).toBe(12);
    expect(salvo.sorteados.atributoCarisma).toBe(8);
    expect(salvo.sorteados.pontosDeVida).toBe(25);
    expect(salvo.sorteados.pontosDeInstamina).toBe(12);
    expect(salvo.sorteados.dinheiro).toBe(70);
    expect(salvo.sorteados.sorte).toBe(10);

    // Campos descritivos/livres NÃO devem estar no localStorage
    expect(salvo.sorteados.nomePersonagem).toBeUndefined();
    expect(salvo.sorteados.nomeJogador).toBeUndefined();
    expect(salvo.sorteados.ambientacao).toBeUndefined();
    expect(salvo.form).toBeUndefined();
  });

  it('não deve restaurar nomePersonagem mesmo se houver dado legado no localStorage', () => {
    // Simula dado antigo no localStorage com nomePersonagem poluído
    const estadoLegado = {
      form: {
        nomePersonagem: 'fdfasfdadfad',
        atributoForca: 12,
        pontosDeVida: 20,
      },
      rolagensRestantes: 2,
    };
    localStorage.setItem('fichaSigmaState', JSON.stringify(estadoLegado));

    component.carregarDoLocalStorage();

    // Nome não deve ser carregado
    expect(component.form.get('nomePersonagem')?.value).toBe('');
    // Atributos e recursos sorteados devem ser carregados
    expect(component.form.get('atributoForca')?.value).toBe(12);
    expect(component.form.get('pontosDeVida')?.value).toBe(20);
  });
});
