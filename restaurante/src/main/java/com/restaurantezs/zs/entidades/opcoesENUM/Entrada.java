package com.restaurantezs.zs.entidades.opcoesENUM;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum Entrada {
    COUVERT(1,39.00),
    BURRATA(2, 74.00),
    CEVICHE(3, 43.00),
    BOLINHO(4, 59.00),
    QUEIJO(5,41.00);

    private int prato;
    private double valor;
    Entrada(int prato, double valor) {
        this.prato = prato;
        this.valor = valor;
    }

    public int getPrato() {
        return prato;
    }

    public double getValor() {
        return valor;
    }

    @JsonCreator
    public static Sobremesa fromValue(int prato) {
        for (Sobremesa s : Sobremesa.values()) {
            if (s.getPrato() == prato) {
                return s;
            }
        }
        throw new IllegalArgumentException("Sobremesa inválida: " + prato);
    }

    @JsonValue
    public int toValue() {
        return this.prato;
    }
}
