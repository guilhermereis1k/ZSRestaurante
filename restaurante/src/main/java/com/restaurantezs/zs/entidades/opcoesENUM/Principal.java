package com.restaurantezs.zs.entidades.opcoesENUM;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

@SuppressWarnings("ALL")
public enum Principal {
    MAGRETDEPATO(1, 189.00),
    BACALHAUASSADOCOMLEGUMES(2, 199.00),
    BIFEANCHOCOMBATATAS(3,188.00),
    RISOTODECAMARAO(4,189.00),
    NHOQUEDEBATATAAOMOLHOSUGO(5,60.00);

    private int prato;
    private double valor;
    Principal(int prato, double valor) {
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
