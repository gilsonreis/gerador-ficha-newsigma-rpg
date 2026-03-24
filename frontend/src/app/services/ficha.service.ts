import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PericiaInput {
  v1: '' | '+' | '-';
  v2: '' | '+' | '-';
}

export interface EquipamentoInput {
  nome: string;
  tipo: string;
  danoDefesa: string;
  observacao: string;
}

export interface NewSigmaFichaRequest {
  nomeJogador: string;
  nomePersonagem: string;
  sexoPersonagem: string;
  idadePersonagem: string;

  arquetipoPersonagem: string;
  especializacaoPersonagem: string;
  nivelPersonagem: string;
  expPersonagem: string;
  ambientacao: string;
  campanha: string;

  atributoForca: string;
  atributoDestreza: string;
  atributoInteligencia: string;
  atributoConstituicao: string;
  atributoCarisma: string;

  pontosDeVida: string;
  pontosDeInstamina: string;
  dinheiro: string;
  sorte: string;
  aparenciaFisica: string;

  historiaPersonagem: string;

  pericias: Record<string, PericiaInput>;
  items: string[];
  equipamentos: EquipamentoInput[];
}

@Injectable({ providedIn: 'root' })
export class FichaService {
  private readonly API = 'http://localhost:8080/api/fichas/newsigma/pdf';

  constructor(private http: HttpClient) {}

  gerarPdf(payload: NewSigmaFichaRequest): Observable<Blob> {
    return this.http.post(this.API, payload, { responseType: 'blob' });
  }
}
