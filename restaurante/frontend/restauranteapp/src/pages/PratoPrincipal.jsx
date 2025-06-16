import "../style/Pratos.css";
import {useNavigate} from "react-router";
import { useContext } from "react";
import { PedidoContext } from "../componentes/PedidoProvider";
import { useCardapio } from "../componentes/CardapioProvider";

const PratoPrincipal = () => {
  const navigate = useNavigate();
  const { setPrincipalId } = useContext(PedidoContext);
  const { getByCategory } = useCardapio();

  const principal = getByCategory('principal');

  const handleSelect = (id) => {
    setPrincipalId(id);
    navigate("/pedido/sobremesa");
  };

  return (
    <div className="pratos__box">
        <h1 className="pratos__titulo">Principal</h1>
            <div className="pratos__lista">
                {principal.map((item, index) => (
                <div key={index} className="pratos__item" onClick={() => handleSelect(item.id)}>
                    <img src={item.imagem} alt={item.nome} className="pratos__imagem" />
                    <h2 className="pratos__nome">{item.nome}</h2>
                    <p className="pratos__descricao">{item.descricao}</p>
                    <p className="pratos__preco">R$ {item.preco.toFixed(2)}</p>
            </div>
        ))}
      </div>
    </div>
  )
}

export default PratoPrincipal
