package com.newsigmarpg.ficha.dto;

import lombok.Getter;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Getter
public class NewSigmaFichaRequest {
    private String nomeJogador;
    private String nomePersonagem;
    private String sexoPersonagem;
    private String idadePersonagem;

    private String arquetipoPersonagem;
    private String especializacaoPersonagem;
    private String nivelPersonagem;
    private String expPersonagem;
    private String ambientacao;
    private String campanha;

    private String atributoForca;
    private String atributoDestreza;
    private String atributoInteligencia;
    private String atributoConstituicao;
    private String atributoCarisma;

    private String pontosDeVida;
    private String pontosDeInstamina;
    private String dinheiro;
    private String aparenciaFisica;

    List<String> items;
    ArrayList<EquipamentoDTO> equipamentos;

    private Map<PericiaEnum, PericiaInputDTO> pericias;

}
