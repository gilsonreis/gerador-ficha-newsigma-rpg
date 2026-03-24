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

export const ARQUETIPO_PERICIAS: Record<string, string[]> = {
  'Combatente': ['ARTES_MARCIAIS', 'ATLETISMO', 'INTIMIDACAO', 'MIRA', 'SOBREVIVENCIA'],
  'Especialista': ['CONHECIMENTO_GERAL', 'CRIACAO', 'DECIFRAR', 'MEDICINA', 'SOBREVIVENCIA'],
  'Explorador': ['ATLETISMO', 'ESCALADA', 'OCULTISMO', 'PILOTAGEM', 'SOBREVIVENCIA'],
  'Astuto': ['CAMUFLAGEM', 'LABIA', 'PERSUASAO', 'DISFARCE', 'INTUICAO'],
  'Místico': ['CRIACAO', 'DECIFRAR', 'INTUICAO', 'OCULTISMO', 'PERCEPCAO', 'RESISTENCIA', 'SOBREVIVENCIA'],
  'Artista': ['CRIACAO', 'LABIA', 'PERSUASAO', 'DISFARCE', 'PERCEPCAO']
};
