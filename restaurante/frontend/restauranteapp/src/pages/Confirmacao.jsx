import { useContext, useState } from "react";
import { PedidoContext } from "../componentes/PedidoProvider";
import axios from 'axios';
import "../style/Confirmacao.css";
import { Link, useNavigate } from "react-router";
import Cookies from 'js-cookie';
import { useCardapio } from "../componentes/CardapioProvider";
import { 
  UtensilsCrossed, 
  Croissant, 
  IceCream 
} from "lucide-react";

export default function Confirmacao() {
  const [animacaoLimpar, setAnimacaoLimpar] = useState(false);
  const [animacaoConfirmar, setAnimacaoConfirmar] = useState(false);
  const [error, setError] = useState("false");
  const { getByCategory, getAllItems } = useCardapio();
  
  const {
    entradaId,
    principalId,
    sobremesaId,
    removerEntrada,
    removerPrincipal,
    removerSobremesa,
    limparPedido,
  } = useContext(PedidoContext);
  const navigate = useNavigate();

  const entrada = getByCategory('entrada');
  const principal = getByCategory('principal');
  const sobremesa = getByCategory('sobremesa');
  const itemEntrada = entrada.find(obj => obj.id === entradaId);
  const itemPrincipal = principal.find(obj => obj.id === principalId);
  const itemSobremesa = sobremesa.find(obj => obj.id === sobremesaId);

  const pedidoVazio = !entradaId && !principalId && !sobremesaId;
  const itensNoCarrinho = [entradaId, principalId, sobremesaId].filter(Boolean).length;

  const calcularTotal = () => {
    let total = 0;
    if (entradaId && entrada?.[entradaId]) total += itemEntrada.preco;
    if (principalId && principal?.[principalId]) total += itemPrincipal.preco;
    if (sobremesaId && sobremesa?.[sobremesaId]) total += itemSobremesa.preco;
    return total;
  };

  const errorHandling = "";

  const handleLimparPedido = () => {
    setAnimacaoLimpar(true);
    setTimeout(() => {
      limparPedido();
      setAnimacaoLimpar(false);
    }, 300);
  };

  const handleConfirmarPedido = async () => {
    setAnimacaoConfirmar(true);

    try {
      const token = Cookies.get('token');

      if (!token) {
        navigate('/login', {
        state: { from: '/pedido/confirmacao' }
      });
      return;
      }
      const pedidoDTO = {
        entrada: entradaId,
        principal: principalId,
        sobremesa: sobremesaId
      };
      const response = await axios.post(
        'http://localhost:8080/pedido/criar',
        pedidoDTO,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log('Pedido criado:', response.data);

      const pedidoId = response.data.id;

      navigate(`/pedido/pedidoConfirmado/${pedidoId}`);
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data);
      } else {
        setError("Erro ao tentar confirmar o pedido. Tente novamente.");
      }
      setError('Erro na requisição:', error);
    }
  };

  return (
    <div className="confirmacao-wrapper">
      <div className="confirmacao-container">
        <div className="confirmacao-header">
          <div className="confirmacao-titulo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h2>Confirme seu pedido</h2>
          </div>
          {!pedidoVazio && (
            <div className="confirmacao-badge">
              {itensNoCarrinho} {itensNoCarrinho === 1 ? 'item' : 'itens'}
            </div>
          )}
        </div>

        {pedidoVazio ? (
          <div className="confirmacao-vazio">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V16.5M9 19.5C9.8 19.5 10.5 20.2 10.5 21S9.8 22.5 9 22.5 7.5 21.8 7.5 21 8.2 19.5 9 19.5ZM20 19.5C20.8 19.5 21.5 20.2 21.5 21S20.8 22.5 20 22.5 18.5 21.8 18.5 21 19.2 19.5 20 19.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h3>Nenhum item selecionado</h3>
            <p>Adicione alguns pratos deliciosos ao seu pedido para continuar.</p>
            <Link to="/" className="btn-retornar">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Voltar ao Menu
            </Link>
          </div>
        ) : (
          <>
            <div className="confirmacao-lista">
              {entradaId && (
                <div className="confirmacao-item entrada">
                  <div className="item-info">
                    <div className="item-icone entrada-icone">
                      <Croissant size={16} />
                    </div>
                    <div className="item-detalhes">
                      <span className="item-categoria">ENTRADA</span>
                      <h4 className="item-nome">{itemEntrada.nome}</h4>
                      <span className="item-preco">R$ {itemEntrada.preco},00</span>
                    </div>
                  </div>
                  <button onClick={removerEntrada} className="item-remover" title="Remover entrada">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              )}

              {principalId && (
                <div className="confirmacao-item principal">
                  <div className="item-info">
                    <div className="item-icone principal-icone">
                      <UtensilsCrossed size={16} />
                    </div>
                    <div className="item-detalhes">
                      <span className="item-categoria">PRATO PRINCIPAL</span>
                      <h4 className="item-nome">{itemPrincipal.nome}</h4>
                      <span className="item-preco">R$ {itemPrincipal.preco},00</span>
                    </div>
                  </div>
                  <button onClick={removerPrincipal} className="item-remover" title="Remover prato principal">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              )}

              {sobremesaId && (
                <div className="confirmacao-item sobremesa">
                  <div className="item-info">
                    <div className="item-icone sobremesa-icone">
                      <IceCream size={16} />
                    </div>
                    <div className="item-detalhes">
                      <span className="item-categoria">SOBREMESA</span>
                      <h4 className="item-nome">{itemSobremesa.nome}</h4>
                      <span className="item-preco">R$ {itemSobremesa.preco},00</span>
                    </div>
                  </div>
                  <button onClick={removerSobremesa} className="item-remover" title="Remover sobremesa">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              )}
            </div>

            <div className="confirmacao-footer">
              <div className="confirmacao-total">
                <span className="total-label">Total do Pedido:</span>
                <span className="total-valor">R$ {calcularTotal()},00</span>
              </div>
              
              <div className="confirmacao-acoes">
                <button
                  onClick={handleLimparPedido}
                  className={`btn-limpar ${animacaoLimpar ? 'animando' : ''}`}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Limpar Carrinho
                </button>
                
                <button 
                  onClick={handleConfirmarPedido}
                  className={`btn-confirmar ${animacaoConfirmar ? 'animando' : ''}`}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Confirmar Pedido
                </button>
              </div>

              <Link to="/" className="btn-voltar-menu">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Voltar ao Menu
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}