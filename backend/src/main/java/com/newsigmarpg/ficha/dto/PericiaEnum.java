package com.newsigmarpg.ficha.dto;

public enum PericiaEnum {
    ARROMBAMENTO("Arrombamento (DES, FOR)"),
    ARTES_MARCIAIS("Artes Marciais (FOR)"),
    ATLETISMO("Atletismo (CON)"),
    CAMUFLAGEM("Camuflagem (DES)"),
    CONHECIMENTO_GERAL("Conhecimento Geral (INT)"),
    CRIACAO("Criação (INT)"),
    DECIFRAR("Decifrar (INT)"),
    DISFARCE("Disfarce (CAR)"),
    ESCALADA("Escalada (DES, CON)"),
    ESTRATEGIA("Estratégia (INT)"),
    FURTIVIDADE("Furtividade (DES)"),
    INTIMIDACAO("Intimidação (CAR, FOR)"),
    INTUICAO("Intuição (INT)"),
    LABIA("Lábia (CAR)"),
    LEVANTAMENTO("Levantamento (FOR)"),
    MEDICINA("Medicina (INT)"),
    MIRA("Mira (DES)"),
    NEGOCIACAO("Negociação (CAR, INT)"),
    OCULTISMO("Ocultismo (INT, CAR)"),
    PERCEPCAO("Percepção (INT, DES)"),
    PERSUASAO("Persuasão (CAR, INT)"),
    PILOTAGEM("Pilotagem (DES)"),
    RESISTENCIA("Resistência (CON, FOR)"),
    SOBREVIVENCIA("Sobrevivência (INT)"),
    PERICIA_ADICIONAL_1(""),
    PERICIA_ADICIONAL_2(""),
    PERICIA_ADICIONAL_3(""),
    PERICIA_ADICIONAL_4(""),
    PERICIA_ADICIONAL_5("");

    private final String nome;

    PericiaEnum(String nome) {
        this.nome = nome;
    }

    public String getNome() {
        return nome;
    }
}
