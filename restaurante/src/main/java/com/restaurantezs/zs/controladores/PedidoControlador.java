package com.restaurantezs.zs.controladores;

import com.restaurantezs.zs.entidades.DTOs.PedidoDTO;
import com.restaurantezs.zs.entidades.DTOs.UsuarioDTO;
import com.restaurantezs.zs.entidades.Pedido;
import com.restaurantezs.zs.servicos.JwtServico;
import com.restaurantezs.zs.servicos.PedidoServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pedido")
public class PedidoControlador {

    @Autowired
    private PedidoServico pedidoServico;

    @Autowired
    private JwtServico jwtServico;

    @PostMapping("/criar")
    public ResponseEntity<Pedido> criarPedido(@RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader, @RequestBody PedidoDTO pedidoDTO) {
        String token = authHeader.replace("Bearer ", "").trim();
        UsuarioDTO usuarioDTO = jwtServico.validateToken(token);
        Pedido pedido = pedidoServico.criarPedido(usuarioDTO.id(), pedidoDTO.entrada(), pedidoDTO.principal(), pedidoDTO.sobremesa());
        return ResponseEntity.ok(pedido);
    }

    @GetMapping("/usuarioId")
    public ResponseEntity<List<Pedido>> acharPedidoPorUsuarioId(@RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader) {
        String token = authHeader.replace("Bearer ", "").trim();
        UsuarioDTO usuarioDTO = jwtServico.validateToken(token);
        List<Pedido> pedidosList = pedidoServico.acharPedidoPorUsuarioId(usuarioDTO.id());

        return ResponseEntity.ok(pedidosList);
    }

    @GetMapping("/{pedidoId}")
    public ResponseEntity<Pedido> acharPedido(@PathVariable Long pedidoId) {
        Pedido pedido = pedidoServico.acharPedidoPorId(pedidoId);
        return ResponseEntity.ok(pedido);
    }

    @PutMapping("/{pedidoId}")
    public ResponseEntity<Pedido> editarPedido(@PathVariable Long pedidoId, @RequestBody PedidoDTO pedidoDTO) {
        Pedido pedido = pedidoServico.editarPedido(pedidoId, pedidoDTO.entrada(), pedidoDTO.principal(), pedidoDTO.sobremesa());
        return ResponseEntity.ok(pedido);
    }

    @DeleteMapping("/{pedidoId}")
    public ResponseEntity<String> deletarPedido(@PathVariable Long pedidoId) {
        pedidoServico.deletarPedidoPorId(pedidoId);
        return ResponseEntity.ok().body("Pedido deletado.");
    }
}
