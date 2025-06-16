import React, { useContext, useState, useEffect } from "react";
import { PedidoContext } from "./PedidoProvider";
import "../style/CarrinhoPopup.css";
import { Link } from "react-router";
import { 
  ShoppingCart, 
  X, 
  UtensilsCrossed, 
  Croissant, 
  IceCream 
} from "lucide-react";

const nomes = {
  entrada: {
    1: "Couvert",
    2: "Burrata Fresca", 
    3: "Ceviche de Caju",
    4: "Bolinho de cupim",
    5: "Queijo Coalho Tostado",
  },
  principal: {
    1: "Magret de Pato",
    2: "Bacalhau assado com Legumes",
    3: "Bife Ancho com Batatas", 
    4: "Risoto de Camarão",
    5: "Nhoque de Batata ao molho Sugo",
  },
  sobremesa: {
    1: "Brigadeiro com Sorvete de Paçoca",
    2: "Doce de Leite com Banana",
    3: "Mousse de Chocolate Belga",
    4: "Pudim de Cumaru",
    5: "Suflê de Doce de Leite",
  },
};

const precos = {
  entrada: { 1: 15, 2: 28, 3: 32, 4: 22, 5: 18 },
  principal: { 1: 65, 2: 58, 3: 72, 4: 48, 5: 38 },
  sobremesa: { 1: 18, 2: 15, 3: 22, 4: 20, 5: 25 }
};

export default function CarrinhoPopup() {
  const {
    entradaId,
    principalId,
    sobremesaId,
    limparPedido,
    removerEntrada,
    removerPrincipal,
    removerSobremesa,
  } = useContext(PedidoContext);

  const [visivel, setVisivel] = useState(false);
  const [retraido, setRetraido] = useState(false);
  const [animacaoLimpar, setAnimacaoLimpar] = useState(false);

  const itensNoCarrinho = [entradaId, principalId, sobremesaId].filter(Boolean).length;

  const calcularTotal = () => {
    let total = 0;
    if (entradaId) total += precos.entrada[entradaId];
    if (principalId) total += precos.principal[principalId];
    if (sobremesaId) total += precos.sobremesa[sobremesaId];
    return total;
  };

  useEffect(() => {
    if (entradaId || principalId || sobremesaId) {
      setVisivel(true);
      setRetraido(false);
      const timeout = setTimeout(() => {
        setRetraido(true);
      }, 4000);
      return () => clearTimeout(timeout);
    } else {
      setVisivel(false);
      setRetraido(true);
    }
  }, [entradaId, principalId, sobremesaId]);

  const handleLimparPedido = () => {
    setAnimacaoLimpar(true);
    setTimeout(() => {
      limparPedido();
      setAnimacaoLimpar(false);
    }, 300);
  };

  if (!visivel) return null;

  return (
    <div
      className={`carrinho-popup ${visivel ? 'visivel' : ''} ${retraido ? 'retraido' : ''}`}
      onMouseEnter={() => setRetraido(false)}
      onMouseLeave={() => setTimeout(() => setRetraido(true), 2000)}
    >
      <div className="carrinho-indicador">
        <div className="carrinho-icone">
          <ShoppingCart size={24} />
          {itensNoCarrinho > 0 && (
            <span className="carrinho-contador">{itensNoCarrinho}</span>
          )}
        </div>
      </div>

      <div className="carrinho-conteudo">
        <div className="carrinho-header">
          <div className="carrinho-titulo">
            <ShoppingCart size={20} />
            <h2>Seu Carrinho</h2>
          </div>
          <div className="carrinho-badge">
            {itensNoCarrinho} {itensNoCarrinho === 1 ? 'item' : 'itens'}
          </div>
        </div>

        <div className="carrinho-lista">
          {entradaId && (
            <div className="carrinho-item entrada">
              <div className="item-info">
                <div className="item-icone entrada-icone">
                  <Croissant size={16} />
                  
                </div>
                <div className="item-detalhes">
                  <span className="item-categoria">ENTRADA</span>
                  <h4 className="item-nome">{nomes.entrada[entradaId]}</h4>
                  <span className="item-preco">R$ {precos.entrada[entradaId]},00</span>
                </div>
              </div>
              <button onClick={removerEntrada} className="item-remover" title="Remover entrada">
                <X size={16} />
              </button>
            </div>
          )}

          {principalId && (
            <div className="carrinho-item principal">
              <div className="item-info">
                <div className="item-icone principal-icone">
                  <UtensilsCrossed size={16} />
                </div>
                <div className="item-detalhes">
                  <span className="item-categoria">PRATO PRINCIPAL</span>
                  <h4 className="item-nome">{nomes.principal[principalId]}</h4>
                  <span className="item-preco">R$ {precos.principal[principalId]},00</span>
                </div>
              </div>
              <button onClick={removerPrincipal} className="item-remover" title="Remover prato principal">
                <X size={16} />
              </button>
            </div>
          )}

          {sobremesaId && (
            <div className="carrinho-item sobremesa">
              <div className="item-info">
                <div className="item-icone sobremesa-icone">
                  <IceCream size={16} />
                </div>
                <div className="item-detalhes">
                  <span className="item-categoria">SOBREMESA</span>
                  <h4 className="item-nome">{nomes.sobremesa[sobremesaId]}</h4>
                  <span className="item-preco">R$ {precos.sobremesa[sobremesaId]},00</span>
                </div>
              </div>
              <button onClick={removerSobremesa} className="item-remover" title="Remover sobremesa">
                <X size={16} />
              </button>
            </div>
          )}
        </div>

        {(entradaId || principalId || sobremesaId) && (
          <div className="carrinho-footer">
            <div className="carrinho-total">
              <span className="total-label">Total: </span>
              <span className="total-valor">R$ {calcularTotal()},00</span>
            </div>
            
            <div className="carrinho-acoes">
              <button
                onClick={handleLimparPedido}
                className={`btn-limpar ${animacaoLimpar ? 'animando' : ''}`}
              >
                Limpar
              </button>
              
              <Link className="btn-finalizar" to="/pedido/confirmacao">
                  Finalizar Pedido
              </Link>
            </div>
          </div>
        )}

        {!entradaId && !principalId && !sobremesaId && (
          <div className="carrinho-vazio">
            <ShoppingCart size={48} />
            <p>Seu carrinho está vazio</p>
          </div>
        )}
      </div>
    </div>
  );
}