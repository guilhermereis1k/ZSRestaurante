import Home from './pages/Home';
import Menu from './componentes/Menu';
import './App.css';
import { Routes, Route, useLocation } from 'react-router';
import Entrada from './pages/Entrada';
import PratoPrincipal from './pages/PratoPrincipal';
import { PedidoProvider } from './componentes/PedidoProvider';
import CarrinhoPopup from './componentes/CarrinhoPopup';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Sobremesa from './pages/Sobremesa';
import Confirmacao from './pages/Confirmacao';
import PedidoConfirmado from './pages/PedidoConfirmado';
import Pedido from './pages/Pedido';
import PedidosList from './pages/PedidosList';
import { CardapioProvider } from './componentes/CardapioProvider';

function AppRoutes() {
  const location = useLocation();

  const exibirCarrinho = [
    "/pedido/entrada",
    "/pedido/principal",
    "/pedido/sobremesa"
  ].includes(location.pathname);

  return (
    <>
      <Menu />
      {exibirCarrinho && <CarrinhoPopup />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pedido/entrada" element={<Entrada />} />
        <Route path="/pedido/principal" element={<PratoPrincipal />} />
        <Route path="/pedido/sobremesa" element={<Sobremesa />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pedido/confirmacao" element={<Confirmacao />} />
        <Route path="/pedido/pedidoConfirmado/:id" element={<PedidoConfirmado />} />
        <Route path="/pedido/:id" element={<Pedido />} />
        <Route path="/pedidos" element={<PedidosList />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <PedidoProvider>
      <CardapioProvider>
        <AppRoutes />
      </CardapioProvider>
    </PedidoProvider>
  );
}
