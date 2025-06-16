package com.restaurantezs.zs.servicos;


import com.restaurantezs.zs.entidades.Pedido;
import com.restaurantezs.zs.entidades.opcoesENUM.Entrada;
import com.restaurantezs.zs.entidades.opcoesENUM.Principal;
import com.restaurantezs.zs.entidades.opcoesENUM.Sobremesa;
import com.restaurantezs.zs.repositorios.PedidoRepositorio;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PedidoServico {

    @Autowired
    PedidoRepositorio pedidoRepositorio;

    public Pedido criarPedido(String usuarioId, Entrada entrada, Principal principal, Sobremesa sobremesa){
        double valorTotal = somarPedido(entrada, principal, sobremesa);
        Pedido pedido = new Pedido(usuarioId, entrada, principal, sobremesa, valorTotal);

        return pedidoRepositorio.save(pedido);
    }

    public Pedido acharPedidoPorId(Long pedidoId){
        return pedidoRepositorio.findById(pedidoId).orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado."));
    }

    public List<Pedido> acharPedidoPorUsuarioId(String usuarioId){
        return pedidoRepositorio.findAllByUsuarioId(usuarioId);
    }

    public void deletarPedidoPorId(Long pedidoId){
        pedidoRepositorio.deleteById(pedidoId);
    }

    public Pedido editarPedido(Long pedidoId, Entrada entrada, Principal principal, Sobremesa sobremesa) {
        Pedido pedido = pedidoRepositorio.findById(pedidoId)
                .orElseThrow(() -> new EntityNotFoundException("Pedido não encontrado"));

        if (entrada != null) pedido.setEntrada(entrada);
        if (principal != null) pedido.setPrincipal(principal);
        if (sobremesa != null) pedido.setSobremesa(sobremesa);

        return pedidoRepositorio.save(pedido);
    }

    public double somarPedido(Entrada entrada, Principal principal, Sobremesa sobremesa){
        double soma = 0.0;
        if (entrada != null){soma += entrada.getValor();}
        if (principal != null){soma += principal.getValor();}
        if (sobremesa != null){soma += sobremesa.getValor();}
        return soma;
    }
}
