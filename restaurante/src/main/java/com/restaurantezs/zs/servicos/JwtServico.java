package com.restaurantezs.zs.servicos;

import com.restaurantezs.zs.entidades.DTOs.UsuarioDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class JwtServico {

    private final WebClient webClient;
    private final String API_KEY = "secret";

    public JwtServico(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("http://localhost:3000").build();
    }

    public UsuarioDTO validateToken(String token) {
        return this.webClient.get()
                .uri("/users/me")
                .header("Cookie", "token=" + token)
                .header("x-api-key", API_KEY)
                .retrieve()
                .bodyToMono(UsuarioDTO.class)
                .block();
    }
}