import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router';
import {
  Calendar, Clock, Package, ArrowLeft, Eye,
  ShoppingBag, UtensilsCrossed, IceCream,
  Croissant
} from 'lucide-react';
import {useCardapio} from '../componentes/CardapioProvider';

import '../style/PedidosList.css';

export default function PedidosList() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getByCategory } = useCardapio();

  const entrada = getByCategory('entrada');
  const principal = getByCategory('principal');
  const sobremesa = getByCategory('sobremesa');

  useEffect(() => {
    async function fetchPedidos() {
      try {
        const token = Cookies.get('token');

        const response = await axios.get('http://localhost:8080/pedido/usuarioId', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setPedidos(response.data);
        console.log('Pedidos carregados:', response.data);
        
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        alert('Erro ao carregar seus pedidos.');
      } finally {
        setLoading(false);
      }
    }

    fetchPedidos();
  }, []);

  const formatarData = (dataString) => {
    return new Date(dataString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatarHora = (dataString) => {
    return new Date(dataString).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatarPreco = (preco) => `R$ ${preco.toFixed(2).replace('.', ',')}`;

  const getPrecoById = (id) => {
  const item =
    entrada.find(i => i.id === id) ||
    principal.find(i => i.id === id) ||
    sobremesa.find(i => i.id === id);
    return item ? item.preco : 0;
  };

  const calcularTotal = (pedido) => {
    const precoEntrada = pedido.entrada ? getPrecoById(pedido.entrada) : 0;
    const precoPrincipal = pedido.principal ? getPrecoById(pedido.principal) : 0;
    const precoSobremesa = pedido.sobremesa ? getPrecoById(pedido.sobremesa) : 0;
    return precoEntrada + precoPrincipal + precoSobremesa;
  };

  if (loading) {
    return (
      <div className="pedidos-container">
        <div className="background-overlay" />
        <div className="pedidos-card">
          <div className="pedidos-header">
            <div className="header-content">
              <Package size={28} />
              <h2>Meus Pedidos</h2>
            </div>
          </div>
          <div className="loading-content">
            <div className="loading-icon">
              <Package size={32} color="white" />
            </div>
            <h3>Carregando pedidos...</h3>
            <p>Por favor, aguarde um momento</p>
          </div>
        </div>
      </div>
    );
  }

  if (pedidos.length === 0) {
    return (
      <div className="pedidos-container">
        <div className="background-overlay" />
        <div className="pedidos-card">
          <div className="pedidos-header">
            <div className="header-content">
              <Package size={28} />
              <h2>Meus Pedidos</h2>
            </div>
          </div>
          <div className="empty-content">
            <ShoppingBag size={64} className="empty-icon" />
            <h3>Você ainda não fez nenhum pedido.</h3>
            <p>Que tal experimentar nossos pratos deliciosos?</p>
            <div className="empty-actions">
              <Link to="/pedido/entrada" className="btn btn-primary">
                <UtensilsCrossed size={20} />
                Fazer Pedido
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pedidos-container">
      <div className="background-overlay" />
      <div className="pedidos-card pedidos-card-wide">
        <div className="pedidos-header">
          <div className="header-content">
            <Package size={28} />
            <h2>Meus Pedidos</h2>
          </div>
          <div className="pedidos-count">
            {pedidos.length} pedido{pedidos.length !== 1 ? 's' : ''}
          </div>
        </div>

        <div className="pedidos-list">
          {pedidos.map((pedido) => (
            <div key={pedido.id} className="pedido-item">
              <div className="pedido-content">
                <div className="pedido-icon">#{pedido.id}</div>
                <div className="pedido-details">
                  <div className="pedido-label">PEDIDO</div>
                  <h4 className="pedido-title">Pedido #{pedido.id}</h4>
                  <div className="pedido-datetime">
                    <div className="datetime-item">
                      <Calendar size={16} />
                      {formatarData(pedido.datahora)}
                    </div>
                    <div className="datetime-item">
                      <Clock size={16} />
                      {formatarHora(pedido.datahora)}
                    </div>
                  </div>
                  <div className="pedido-items">
                    {pedido.entrada && (
                      <div className="item-tag item-tag-entrada">
                        <Croissant size={12} />
                        Entrada
                      </div>
                    )}
                    {pedido.principal && (
                      <div className="item-tag item-tag-principal">
                        <UtensilsCrossed size={12} />
                        Principal
                      </div>
                    )}
                    {pedido.sobremesa && (
                      <div className="item-tag item-tag-sobremesa">
                        <IceCream size={12} />
                        Sobremesa
                      </div>
                    )}
                  </div>
                  <div className="pedido-price">
                    Total: {formatarPreco(calcularTotal(pedido))}
                  </div>
                </div>
                <Link to={`/pedido/${pedido.id}`} className="btn btn-secondary">
                  <Eye size={16} />
                  Ver detalhes
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="pedidos-footer">
          <div className="total-geral">
            <span className="total-label">Total Geral:</span>
            <span className="total-value">
              {formatarPreco(pedidos.reduce((acc, pedido) => acc + calcularTotal(pedido), 0))}
            </span>
          </div>
          <div className="footer-actions">
            <Link to="/" className="btn btn-primary btn-flex">
              <ArrowLeft size={20} />
              Voltar ao Menu
            </Link>
            <Link to="/pedido/entrada" className="btn btn-secondary btn-flex">
              <UtensilsCrossed size={20} />
              Novo Pedido
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
