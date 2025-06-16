import { Link, useParams } from 'react-router';
import "../style/Confirmacao.css";

export default function PedidoConfirmado() {
const { id } = useParams();

  return (
    <div className="confirmacao-wrapper">
      <div className="confirmacao-container">
        <div className="confirmacao-header">
          <div className="confirmacao-titulo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h2>Pedido Confirmado!</h2>
          </div>
        </div>

        <div className="confirmacao-vazio">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="pedido-confirmado-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#134141"/>
                <stop offset="100%" stopColor="#1b4432"/>
              </linearGradient>
            </defs>
            <circle cx="12" cy="12" r="10" fill="url(#pedido-confirmado-gradient)"/>
            <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h3>Seu pedido foi enviado com sucesso!</h3>
          <p>Agora é só aguardar que já estamos preparando tudo com muito carinho.</p>
          <div className='confirmacao-botoes'>
            <Link to="pedido/entrada" className="btn-retornar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Pedir novamente
            </Link>
            <Link to={`/pedido/${id}`} className="btn-verpedido">
                Ver pedido
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}