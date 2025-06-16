package com.restaurantezs.zs.entidades.DTOs;

import com.restaurantezs.zs.entidades.opcoesENUM.Entrada;
import com.restaurantezs.zs.entidades.opcoesENUM.Principal;
import com.restaurantezs.zs.entidades.opcoesENUM.Sobremesa;


public record PedidoDTO(Entrada entrada, Principal principal, Sobremesa sobremesa) {
}
