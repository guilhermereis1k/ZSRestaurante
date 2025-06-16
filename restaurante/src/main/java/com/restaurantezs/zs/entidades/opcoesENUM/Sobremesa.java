package com.restaurantezs.zs.entidades.opcoesENUM;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

@SuppressWarnings("ALL")
public enum Sobremesa {
    BRIGADEIROCOMSORVETEDEPACOCA(1, 44.00),
    DOCEDELEITECOMBANANA(2,47.00 ),
    MOUSSEDECHOCOLATE(3,45.00),
    PUDIMDECUMARU(4,43.00),
    SUFLEDEDOCEDELEITE(5,40.00);

    private int prato;
    private double valor;

    Sobremesa(int prato, double valor) {
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
