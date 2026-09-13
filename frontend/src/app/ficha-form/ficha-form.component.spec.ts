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
});
