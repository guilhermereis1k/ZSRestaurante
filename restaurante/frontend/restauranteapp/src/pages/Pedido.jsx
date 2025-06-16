import { useState, useEffect } from 'react';
import { Link, useParams} from 'react-router';
import axios from 'axios';
import '../style/Pedido.css';
import { useCardapio } from "../componentes/CardapioProvider";

export default function Pedido() {
  const { getByCategory } = useCardapio();
  const [pedidoData, setPedidoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const entrada = getByCategory('entrada');
  const principal = getByCategory('principal');
  const sobremesa = getByCategory('sobremesa');

  useEffect(() => {
    async function receberPedido() {
      try {
        const response = await axios.get(`http://localhost:8080/pedido/${id}`);
        console.log('Resposta do pedido:', response.data);
        setPedidoData(response.data);
      } catch (error) {
        if (error.response && error.response.data) {
          alert(`Erro: ${error.response.data}`);
        } else {
          alert("Erro ao tentar buscar o pedido. Tente novamente.");
        }
        console.error('Erro na requisição:', error);
      } finally {
        setLoading(false);
      }
    }
    receberPedido();
  }, [id]);

  const itemEntrada = pedidoData?.entrada ? entrada.find(obj => obj.id === pedidoData.entrada) : null;
  const itemPrincipal = pedidoData?.principal ? principal.find(obj => obj.id === pedidoData.principal) : null;
  const itemSobremesa = pedidoData?.sobremesa ? sobremesa.find(obj => obj.id === pedidoData.sobremesa) : null;

  const formatarData = (dataString) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatarHora = (dataString) => {
    const data = new Date(dataString);
    return data.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatarPreco = (preco) => {
    return `R$ ${preco},00`;
  };

  const calcularTotal = () => {
    let total = 0;
    if (itemEntrada) total += itemEntrada.preco;
    if (itemPrincipal) total += itemPrincipal.preco;
    if (itemSobremesa) total += itemSobremesa.preco;
    return total;
  };

  if (loading) {
    return (
      <div className="pedido-wrapper">
        <div className="pedido-container">
          <div className="pedido-vazio">
            <div className="loading-spinner"></div>
            <h3>Carregando pedido...</h3>
            <p>Aguarde enquanto buscamos os detalhes do seu pedido.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!pedidoData) {
    return (
      <div className="pedido-wrapper">
        <div className="pedido-container">
          <div className="pedido-vazio">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h3>Pedido não encontrado</h3>
            <p>Não foi possível encontrar os detalhes deste pedido.</p>
            <Link to="/" className="btn-retornar">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Voltar ao Menu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pedido-wrapper">
      <div className="pedido-container">
        <div className="pedido-header">
          <div className="pedido-titulo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h2>Pedido #{pedidoData.id}</h2>
          </div>
        </div>

        <div className="pedido-info">
          <div className="pedido-meta">
            <div className="meta-item">
              <svg className="meta-icon" viewBox="0 0 24 24" fill="none">
                <path d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div>
                <div className="meta-label">Data</div>
                <div className="meta-value">{formatarData(pedidoData.datahora)}</div>
              </div>
            </div>
            <div className="meta-item">
              <svg className="meta-icon" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div>
                <div className="meta-label">Horário</div>
                <div className="meta-value">{formatarHora(pedidoData.datahora)}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="pedido-lista">
          {itemEntrada && (
            <div className="pedido-item entrada">
              <div className="item-info">
                <div className="item-icone entrada-icone">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 13.5V21.5C6 22.6 6.9 23.5 8 23.5H16C17.1 23.5 18 22.6 18 21.5V13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 17.5H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 2.5C8.1 2.5 5 5.6 5 9.5C5 11.6 6.2 13.4 8 14.3C8.4 14.5 8.7 14.9 8.7 15.4V16.5C8.7 17.6 9.6 18.5 10.7 18.5H13.3C14.4 18.5 15.3 17.6 15.3 16.5V15.4C15.3 14.9 15.6 14.5 16 14.3C17.8 13.4 19 11.6 19 9.5C19 5.6 15.9 2.5 12 2.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="item-detalhes">
                  <span className="item-categoria">ENTRADA</span>
                  <h4 className="item-nome">{itemEntrada.nome}</h4>
                  <span className="item-preco">{formatarPreco(itemEntrada.preco)}</span>
                </div>
              </div>
            </div>
          )}

          {itemPrincipal && (
            <div className="pedido-item principal">
              <div className="item-info">
                <div className="item-icone principal-icone">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 2L7 6V20L5 18L3 20V2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 2L17 6V20L19 18L21 20V2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 6H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="item-detalhes">
                  <span className="item-categoria">PRATO PRINCIPAL</span>
                  <h4 className="item-nome">{itemPrincipal.nome}</h4>
                  <span className="item-preco">{formatarPreco(itemPrincipal.preco)}</span>
                </div>
              </div>
            </div>
          )}

          {itemSobremesa && (
            <div className="pedido-item sobremesa">
              <div className="item-info">
                <div className="item-icone sobremesa-icone">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 21L12 17L16 21H8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 13V3C8 2.4 8.4 2 9 2H15C15.6 2 16 3V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 8C18.2 8 20 6.2 20 4S18.2 0 16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="item-detalhes">
                  <span className="item-categoria">SOBREMESA</span>
                  <h4 className="item-nome">{itemSobremesa.nome}</h4>
                  <span className="item-preco">{formatarPreco(itemSobremesa.preco)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="pedido-footer">
          <div className="pedido-total">
            <span className="total-label">Total do Pedido:</span>
            <span className="total-valor">{formatarPreco(calcularTotal())}</span>
          </div>

          <div className="pedido-acoes">
            <Link to="/" className="btn-voltar-menu">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Voltar ao Início
            </Link>
            
            <Link to="/pedido/entrada" className="btn-confirmar">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Fazer Novo Pedido
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}