import "../style/Pratos.css";
import {useNavigate} from "react-router";
import { useContext } from "react";
import { PedidoContext } from "../componentes/PedidoProvider";
import { useCardapio } from "../componentes/CardapioProvider";

const Sobremesa = () => {
  const navigate = useNavigate();
  const { setSobremesaId } = useContext(PedidoContext);
  const { getByCategory } = useCardapio();

  const sobremesa = getByCategory('sobremesa');

  const handleSelect = (id) => {
    setSobremesaId(id);
    navigate("/pedido/confirmacao");
  };

  return (
    <div className="pratos__box">
        <h1 className="pratos__titulo">Sobremesa</h1>
            <div className="pratos__lista">
                {sobremesa.map((item, index) => (
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

export default Sobremesa
