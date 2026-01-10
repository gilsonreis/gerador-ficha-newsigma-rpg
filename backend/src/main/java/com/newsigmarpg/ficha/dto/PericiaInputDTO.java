package com.newsigmarpg.ficha.dto;

public class PericiaInputDTO {
    private String v1;
    private String v2;

    public String getV1() {
        return v1 == null ? "" : v1;
    }

    public String getV2() {
        return v2 == null ? "" : v2;
    }
}
