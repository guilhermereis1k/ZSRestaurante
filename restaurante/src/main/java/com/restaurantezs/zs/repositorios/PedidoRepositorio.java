package com.restaurantezs.zs.repositorios;

import com.restaurantezs.zs.entidades.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PedidoRepositorio extends JpaRepository<Pedido, Long> {
    List<Pedido> findAllByUsuarioId(String usuarioId);
}
