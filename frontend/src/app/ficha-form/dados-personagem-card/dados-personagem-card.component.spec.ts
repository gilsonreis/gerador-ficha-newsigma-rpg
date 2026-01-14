import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosPersonagemCardComponent } from './dados-personagem-card.component';

describe('DadosPersonagemCardComponent', () => {
  let component: DadosPersonagemCardComponent;
  let fixture: ComponentFixture<DadosPersonagemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadosPersonagemCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DadosPersonagemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
