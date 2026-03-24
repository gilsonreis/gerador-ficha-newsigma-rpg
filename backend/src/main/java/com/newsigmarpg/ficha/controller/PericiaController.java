package com.newsigmarpg.ficha.controller;

import com.newsigmarpg.ficha.service.PericiaService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/pericias")
public class PericiaController {

    private final PericiaService periciaService;

    public PericiaController(PericiaService periciaService) {
        this.periciaService = periciaService;
    }

    @GetMapping
    public List<String> listar() {
        return periciaService.listarTodas();
    }
}
