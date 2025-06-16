import { createContext, useContext } from 'react';

import Couvert from "../assets/couvert.jpg";
import Burrata from "../assets/burrata.jpg";
import Ceviche from "../assets/ceviche.jpeg";
import Bolinho from "../assets/bolinho.jpg";
import Queijo from "../assets/queijo.jpg";

import Magret from "../assets/magret.webp";
import Bacalhau from "../assets/Bacalhau.webp";
import Bife from "../assets/Bife.webp";
import Risoto from "../assets/Risoto.webp";
import Nhoque from "../assets/Nhoque.webp";

import Brigadeiro from "../assets/Brigadeiro.jpeg";
import Doce from "../assets/Doce.jpg";
import Mousse from "../assets/Mousse.webp";
import Pudim from "../assets/Pudim.webp";
import Sufle from "../assets/Sufle.webp";

const CardapioContext = createContext();

const cardapioData = {
  entrada: [
    {
      id: 1,
      nome: "Couvert",
      descricao: "Pães, manteiga com limão e mel com mussarela de búfala.",
      preco: 39.0,
      imagem: Couvert,
    },
    {
      id: 2,
      nome: "Burrata Fresca",
      descricao: "Com pesto de rúcula e tomates cítricos.",
      preco: 74.0,
      imagem: Burrata,
    },
    {
      id: 3,
      nome: "Ceviche de Caju",
      descricao: "feita com pedaços suculentos de caju marinados em limão.",
      preco: 43.0,
      imagem: Ceviche,
    },
    {
      id: 4,
      nome: "Bolinho de cupim",
      descricao: "Bolinhos de cupim desfiado, temperado, empanado e frito.",
      preco: 59.0,
      imagem: Bolinho,
    },
    {
      id: 5,
      nome: "Queijo Coalho Tostado",
      descricao: "Com melado e uva verde.",
      preco: 41.0,
      imagem: Queijo,
    },
  ],
  
  principal: [
    {
      id: 1,
      nome: "Magret de Pato",
      descricao: "Ao vinho do porto, purê de mandioquinha, banana ouro e mini cebola",
      preco: 189.0,
      imagem: Magret,
    },
    {
      id: 2,
      nome: "Bacalhau assado com Legumes",
      descricao: "Obs: ocasionalmente espinhas podem ser encontradas!",
      preco: 199.0,
      imagem: Bacalhau,
    },
    {
      id: 3,
      nome: "Bife Ancho com Batatas",
      descricao: "Com molho chimichurri",
      preco: 188.0,
      imagem: Bife,
    },
    {
      id: 4,
      nome: "Risoto de Camarão",
      descricao: "Com aspargos e alho poró",
      preco: 189.0,
      imagem: Risoto,
    },
    {
      id: 5,
      nome: "Nhoque de Batata ao molho Sugo",
      descricao: "Com delicioso tempero da casa",
      preco: 60.0,
      imagem: Nhoque,
    },
  ],
  
  sobremesa: [
    {
      id: 1,
      nome: "Brigadeiro com Sorvete de Paçoca",
      descricao: "Com pralinê e calda de chocolate.",
      preco: 44.0,
      imagem: Brigadeiro,
    },
    {
      id: 2,
      nome: "Doce de Leite com Banana",
      descricao: "Com sorvete de baunilha e biscotti.",
      preco: 47.0,
      imagem: Doce,
    },
    {
      id: 3,
      nome: "Mousse de Chocolate Belga",
      descricao: "Com Caramelo.",
      preco: 45.0,
      imagem: Mousse,
    },
    {
      id: 4,
      nome: "Pudim de Cumaru",
      descricao: "Com calda de frutas vermelhas e sementes de papoula.",
      preco: 43.0,
      imagem: Pudim,
    },
    {
      id: 5,
      nome: "Suflê de Doce de Leite",
      descricao: "Finalizado com leite em pó ou calda de chocolate.",
      preco: 40.0,
      imagem: Sufle,
    },
  ],
};

export const useCardapio = () => {
  return useContext(CardapioContext);
};

export const CardapioProvider = ({ children }) => {
  const getByCategory = (categoria) => {
    return cardapioData[categoria] || [];
  };

  const getById = (categoria, id) => {
    return cardapioData[categoria]?.find(item => item.id === id);
  };

  const getAllItems = () => {
  return {
    entrada: cardapioData.entrada,
    principal: cardapioData.principal,
    sobremesa: cardapioData.sobremesa
  };
};

  const searchByName = (termo) => {
    const todos = getAllItems();
    return todos.filter(item => 
      item.nome.toLowerCase().includes(termo.toLowerCase())
    );
  };

  const value = {
    cardapio: cardapioData,
    getByCategory,
    getById,
    getAllItems,
    searchByName,
  };

  return (
    <CardapioContext.Provider value={value}>
      {children}
    </CardapioContext.Provider>
  );
};