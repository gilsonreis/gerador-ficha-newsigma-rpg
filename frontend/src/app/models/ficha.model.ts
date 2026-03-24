export interface DadosPersonagem {
  jogador: string;
  personagem: string;
  sexo: string;
  idade: number;
  arquetipo: string;
  historia: string;
}

export interface Atributos {
  forca: number;
  destreza: number;
  inteligencia: number;
  constituicao: number;
  carisma: number;
  pv: number;
  stamina: number;
  dinheiro: number;
}

export interface Pericia {
  nome: string;
  atributos: string[];
  valor: number;
}

export interface Equipamento {
  nome: string;
  tipo: string;
  danoDefesa: string;
  observacao: string;
}

export interface Ficha {
  dados: DadosPersonagem;
  atributos: Atributos;
  pericias: Pericia[];
  itens: string[];
  equipamentos: Equipamento[];
}
