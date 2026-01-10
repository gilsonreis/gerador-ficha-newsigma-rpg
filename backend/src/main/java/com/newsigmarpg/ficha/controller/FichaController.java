package com.newsigmarpg.ficha.controller;

import com.newsigmarpg.ficha.dto.NewSigmaFichaRequest;
import com.newsigmarpg.ficha.service.NewSigmaFichaReportService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/fichas/newsigma")
public class FichaController {
    private NewSigmaFichaReportService service;

    public FichaController(NewSigmaFichaReportService service) {
        this.service = service;
    }

    @PostMapping("/pdf")
    public ResponseEntity<byte[]> gerarPdf(@RequestBody NewSigmaFichaRequest request) {

        try {
            byte[] pdf = service.gerarPdf(request);

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=ficha-newsigma.pdf")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(pdf);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
