package com.newsigmarpg.ficha.service;

import com.newsigmarpg.ficha.dto.EquipamentoDTO;
import com.newsigmarpg.ficha.dto.NewSigmaFichaRequest;
import com.newsigmarpg.ficha.dto.PericiaReportDTO;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class NewSigmaFichaReportService {

    private final PericiaReportAssembler periciaReportAssembler;

    public NewSigmaFichaReportService(PericiaReportAssembler periciaReportAssembler) {
        this.periciaReportAssembler = periciaReportAssembler;
    }

    public byte[] gerarPdf(NewSigmaFichaRequest request) throws Exception {

        InputStream jasperStream =
                new ClassPathResource("reports/FichaPersonagem.jasper").getInputStream();

        Map<String, Object> params = new HashMap<>();

        params.put("nomeJogador", request.getNomeJogador());
        params.put("nomePersonagem", request.getNomePersonagem());
        params.put("sexoPersonagem", request.getSexoPersonagem());
        params.put("idadePersonagem", request.getIdadePersonagem());

        params.put("arquetipoPersonagem", request.getArquetipoPersonagem());
        params.put("especializacaoPersonagem", request.getEspecializacaoPersonagem());
        params.put("nivelPersonagem", request.getNivelPersonagem());
        params.put("expPersonagem", request.getExpPersonagem());
        params.put("ambientacao", request.getAmbientacao());
        params.put("campanha", request.getCampanha());

        params.put("atributoForca", request.getAtributoForca());
        params.put("atributoDestreza", request.getAtributoDestreza());
        params.put("atributoInteligencia", request.getAtributoInteligencia());
        params.put("atributoConstituicao", request.getAtributoConstituicao());
        params.put("atributoCarisma", request.getAtributoCarisma());

        params.put("pontosDeVida", request.getPontosDeVida());
        params.put("pontosDeInstamina", request.getPontosDeInstamina());
        params.put("dinheiro", request.getDinheiro());

        params.put("aparenciaFisica", request.getAparenciaFisica());

        List<PericiaReportDTO> pericias =
                periciaReportAssembler.montar(request);

        params.put(
                "listPericias",
                new JRBeanCollectionDataSource(pericias)
        );

        List<String> items = this.setListItems(request.getItems());

        params.put("listItens", new JRBeanCollectionDataSource(items));

        List<EquipamentoDTO> equipamentos = padEquipamentos(request.getEquipamentos());

        params.put(
                "listEquipamentos",
                new JRBeanCollectionDataSource(equipamentos)
        );

        JasperPrint jasperPrint = JasperFillManager.fillReport(
                jasperStream,
                params,
                new JREmptyDataSource(1)
        );

        return JasperExportManager.exportReportToPdf(jasperPrint);
    }

    /**
     * Returns padded list of strings to fixed size
     */
    private List<String> setListItems(List<String> items) {
        final int MAX_ITEMS = 11;
        List<String> result = new ArrayList<>(MAX_ITEMS);
        if (items != null) {
            result.addAll(items);
        }
        while (result.size() < MAX_ITEMS) {
            result.add("");
        }
        return result;

    }

    private List<EquipamentoDTO> padEquipamentos(
            List<EquipamentoDTO> itens
    ) {
        final int MAX = 10;

        List<EquipamentoDTO> result = new ArrayList<>();
        if (itens != null) {
            result.addAll(itens);
        }

        while (result.size() < MAX) {
            result.add(new EquipamentoDTO());
        }

        return result;
    }
}
