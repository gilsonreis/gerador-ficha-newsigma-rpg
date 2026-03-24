package com.newsigmarpg.ficha.service;

import com.newsigmarpg.ficha.dto.PericiaEnum;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PericiaService {

    public List<String> listarTodas() {
        return Arrays.stream(PericiaEnum.values())
                .map(PericiaEnum::getNome)
                .filter(nome -> !nome.isEmpty())
                .collect(Collectors.toList());
    }
}
