package com.newsigmarpg.ficha.service;

import com.newsigmarpg.ficha.dto.NewSigmaFichaRequest;
import com.newsigmarpg.ficha.dto.PericiaEnum;
import com.newsigmarpg.ficha.dto.PericiaInputDTO;
import com.newsigmarpg.ficha.dto.PericiaReportDTO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class PericiaReportAssembler {
    public List<PericiaReportDTO> montar(NewSigmaFichaRequest request) {

        Map<PericiaEnum, PericiaInputDTO> entrada =
                request.getPericias() == null
                        ? Map.of()
                        : request.getPericias();

        List<PericiaReportDTO> resultado = new ArrayList<>();

        for (PericiaEnum pericia : PericiaEnum.values()) {

            PericiaInputDTO input = entrada.get(pericia);

            String v1 = "";
            String v2 = "";

            if (input != null) {
                validar(input);
                v1 = input.getV1();
                v2 = input.getV2();
            }

            resultado.add(
                    new PericiaReportDTO(
                            pericia.getNome(),
                            v1,
                            v2
                    )
            );
        }

        return resultado;
    }

    private void validar(PericiaInputDTO dto) {

        List<String> permitidos = List.of("", "+", "-");

        if (!permitidos.contains(dto.getV1()) || !permitidos.contains(dto.getV2())) {
            throw new IllegalArgumentException("Valor inválido de perícia");
        }

        if (!dto.getV2().isEmpty() && !dto.getV1().equals(dto.getV2())) {
            throw new IllegalArgumentException("v2 só pode existir se for igual a v1");
        }
    }
}
