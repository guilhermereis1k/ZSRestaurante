import "../style/Pratos.css";
import {useNavigate} from "react-router";
import { useContext } from "react";
import { PedidoContext } from "../componentes/PedidoProvider";
import { useCardapio } from "../componentes/CardapioProvider";

const Entrada = () => {
  const navigate = useNavigate();
  const { setEntradaId } = useContext(PedidoContext);
  const { getByCategory } = useCardapio();
  
  const entrada = getByCategory('entrada');

  const handleSelect = (id) => {
    setEntradaId(id);
    navigate("/pedido/principal");
  };

  return (
    <div className="pratos__box">
        <h1 className="pratos__titulo">Entradas</h1>
            <div className="pratos__lista">
                {entrada.map((item, index) => (
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

export default Entrada
