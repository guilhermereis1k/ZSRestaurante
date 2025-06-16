import React, { createContext, useState, useEffect } from "react";

export const PedidoContext = createContext();

export const PedidoProvider = ({ children }) => {
  const [entradaId, setEntradaId] = useState(null);
  const [principalId, setPrincipalId] = useState(null);
  const [sobremesaId, setSobremesaId] = useState(null);

  useEffect(() => {
    console.log("Pedido atualizado:", { entradaId, principalId, sobremesaId });
  }, [entradaId, principalId, sobremesaId]);

  const limparPedido = () => {
    setEntradaId(null);
    setPrincipalId(null);
    setSobremesaId(null);
  };

  const removerEntrada = () => setEntradaId(null);
  const removerPrincipal = () => setPrincipalId(null);
  const removerSobremesa = () => setSobremesaId(null);

  return (
    <PedidoContext.Provider
      value={{
        entradaId,
        principalId,
        sobremesaId,
        setEntradaId,
        setPrincipalId,
        setSobremesaId,
        limparPedido,
        removerEntrada,
        removerPrincipal,
        removerSobremesa,
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
};
