package com.restaurantezs.zs.entidades;


import com.restaurantezs.zs.entidades.opcoesENUM.Entrada;
import com.restaurantezs.zs.entidades.opcoesENUM.Principal;
import com.restaurantezs.zs.entidades.opcoesENUM.Sobremesa;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name="pedido")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime datahora;
    private String usuarioId;
    private Entrada entrada;
    private Principal principal;
    private Sobremesa sobremesa;
    private Double valorTotal;

    public LocalDateTime getDatahora() {
        return datahora;
    }

    public String getUsuarioId() {
        return usuarioId;
    }

    public Entrada getEntrada() {
        return entrada;
    }

    public Principal getPrincipal() {
        return principal;
    }

    public Sobremesa getSobremesa() {
        return sobremesa;
    }

    public void setEntrada(Entrada entrada) {
        this.entrada = entrada;
    }

    public void setPrincipal(Principal principal) {
        this.principal = principal;
    }

    public void setSobremesa(Sobremesa sobremesa) {
        this.sobremesa = sobremesa;
    }

    public Long getId() {
        return id;
    }

    public Double getValorTotal() {
        return valorTotal;
    }

    public Pedido() {}

    public Pedido(String usuarioId, Entrada entrada, Principal principal, Sobremesa sobremesa, Double valorTotal) {
        this.datahora = LocalDateTime.now();
        this.usuarioId = usuarioId;
        this.entrada = entrada;
        this.principal = principal;
        this.sobremesa = sobremesa;
        this.valorTotal = valorTotal;
    }

    public Pedido(Long id, LocalDateTime datahora, String usuarioId, Entrada entrada, Principal principal, Sobremesa sobremesa, Double valorTotal) {
        this.id = id;
        this.datahora = datahora;
        this.usuarioId = usuarioId;
        this.entrada = entrada;
        this.principal = principal;
        this.sobremesa = sobremesa;
        this.valorTotal = valorTotal;
    }
}
