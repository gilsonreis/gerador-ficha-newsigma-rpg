export interface PericiaData {
  key: string;
  nome: string;
}

export const PERICIAS_LIST: PericiaData[] = [
  { key: 'ARROMBAMENTO',      nome: 'Arrombamento (DES, FOR)' },
  { key: 'ARTES_MARCIAIS',    nome: 'Artes Marciais (FOR)' },
  { key: 'ATLETISMO',         nome: 'Atletismo (CON)' },
  { key: 'CAMUFLAGEM',        nome: 'Camuflagem (DES)' },
  { key: 'CONHECIMENTO_GERAL',nome: 'Conhecimento Geral (INT)' },
  { key: 'CRIACAO',           nome: 'Criação (INT)' },
  { key: 'DECIFRAR',          nome: 'Decifrar (INT)' },
  { key: 'DISFARCE',          nome: 'Disfarce (CAR)' },
  { key: 'ESCALADA',          nome: 'Escalada (DES, CON)' },
  { key: 'ESTRATEGIA',        nome: 'Estratégia (INT)' },
  { key: 'FURTIVIDADE',       nome: 'Furtividade (DES)' },
  { key: 'INTIMIDACAO',       nome: 'Intimidação (CAR, FOR)' },
  { key: 'INTUICAO',          nome: 'Intuição (INT)' },
  { key: 'LABIA',             nome: 'Lábia (CAR)' },
  { key: 'LEVANTAMENTO',      nome: 'Levantamento (FOR)' },
  { key: 'MEDICINA',          nome: 'Medicina (INT)' },
  { key: 'MIRA',              nome: 'Mira (DES)' },
  { key: 'NEGOCIACAO',        nome: 'Negociação (CAR, INT)' },
  { key: 'OCULTISMO',         nome: 'Ocultismo (INT, CAR)' },
  { key: 'PERCEPCAO',         nome: 'Percepção (INT, DES)' },
  { key: 'PERSUASAO',         nome: 'Persuasão (CAR, INT)' },
  { key: 'PILOTAGEM',         nome: 'Pilotagem (DES)' },
  { key: 'RESILIENCIA',       nome: 'Resiliência (CON)' },
  { key: 'RESISTENCIA',       nome: 'Resistência (FOR)' },
  { key: 'SOBREVIVENCIA',     nome: 'Sobrevivência (INT)' },
];

export type PericiaValor = '' | '+' | '-';

export interface PericiaNivel {
  v1: PericiaValor;
  v2: PericiaValor;
}

export const ARQUETIPO_PERICIAS: Record<string, Record<string, PericiaNivel>> = {
  'Combatente': {
    'ARTES_MARCIAIS': { v1: '+', v2: '+' },
    'ATLETISMO':      { v1: '+', v2: '' },
    'LABIA':          { v1: '-', v2: '' },
  },
  'Especialista': {
    'DECIFRAR':       { v1: '+', v2: '+' },
    'CRIACAO':        { v1: '+', v2: '' },
    'ATLETISMO':      { v1: '-', v2: '' },
  },
  'Explorador': {
    'SOBREVIVENCIA':  { v1: '+', v2: '+' },
    'ESCALADA':       { v1: '+', v2: '' },
    'NEGOCIACAO':     { v1: '-', v2: '' },
  },
  'Astuto': {
    'DISFARCE':       { v1: '+', v2: '+' },
    'PERSUASAO':      { v1: '+', v2: '' },
    'LEVANTAMENTO':   { v1: '-', v2: '' },
  },
  'Místico': {
    'OCULTISMO':      { v1: '+', v2: '+' },
    'INTUICAO':       { v1: '+', v2: '' },
    'LEVANTAMENTO':   { v1: '-', v2: '' },
  },
  'Artista': {
    'CRIACAO':        { v1: '+', v2: '+' },
    'PERSUASAO':      { v1: '+', v2: '' },
    'RESISTENCIA':    { v1: '-', v2: '' },
  },
};

export interface ResumoPontosPericias {
  negativosManuais: number;
  pontosComprados: number;
  pontosDisponiveis: number;
  pontosRestantes: number;
}

export function calcularResumoPontos(
  periciasVal: Record<string, { v1?: string; v2?: string }>,
  arquetipo: string,
  nivel: number
): ResumoPontosPericias {
  const config = ARQUETIPO_PERICIAS[arquetipo] || {};
  let negativosManuais = 0;
  let pontosComprados = 0;

  for (const key of Object.keys(periciasVal || {})) {
    const v = periciasVal[key] || { v1: '', v2: '' };
    const arq = config[key];

    // Negativos manuais (não conta o -1 base do arquétipo)
    if (arq?.v1 === '-') {
      if (v.v2 === '-') negativosManuais++;
    } else {
      if (v.v1 === '-') negativosManuais++;
      if (v.v2 === '-') negativosManuais++;
    }

    // Pontos comprados (não conta o +2 ou +1 base do arquétipo)
    if (arq) {
      if (arq.v1 === '+' && arq.v2 === '') {
        if (v.v2 === '+') pontosComprados++;
      }
    } else {
      if (v.v1 === '+') pontosComprados++;
      if (v.v2 === '+') pontosComprados++;
    }
  }

  const nivelNum = Number(nivel) || 1;
  const pontosDisponiveis = 3 + (nivelNum - 1) + negativosManuais;
  const pontosRestantes = pontosDisponiveis - pontosComprados;

  return {
    negativosManuais,
    pontosComprados,
    pontosDisponiveis,
    pontosRestantes,
  };
}
