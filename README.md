# Restaurante App

Aplicação completa com backend em SpringBoot, autenticação com Node.js e frontend em React.


## Como rodar o projeto

### 1. Clone o repositório

git clone [https://github.com/guilhermereis1k/ZSRestaurante](https://github.com/guilhermereis1k/ZSRestaurante)
cd ZSRestaurante

### 2. Instale as dependências
   
- Para o backend NodeJs (Consulte a README.md na pasta auth)

- Para o frontend:

  cd ../frontend/restauranteapp
  npm install

### 3. Inicie os servidores

- Para o backend NodeJs (Consulte a README.md na pasta auth)

- Para o frontend:

  cd ../frontend/restauranteapp
  npm run dev

---

# Frontend

### Tecnologias Utilizadas

- **React.js** (SPA)
- **React Router DOM**
- **Context API** (para controle de estado de pedidos e cardápio)
- **Axios** (requisições HTTP)
- **JavaScript (ES6+)**
- **CSS Modules / SCSS**

---

### Funcionalidades Principais

- Visualização de cardápio por categorias (entrada, prato principal, sobremesa)
- Escolha de um item por categoria
- Carrinho interativo com resumo do pedido
- Confirmação de pedido e envio ao backend
- Login e cadastro de usuários
- Visualização de pedidos anteriores

---

### Navegação da Aplicação

| Rota                             | Página                  | Descrição                                      |
|----------------------------------|--------------------------|------------------------------------------------|
| `/`                              | Home                     | Página inicial com introdução ao restaurante   |
| `/pedido/entrada`               | Entrada                  | Escolha da entrada                             |
| `/pedido/principal`            | PratoPrincipal           | Escolha do prato principal                     |
| `/pedido/sobremesa`            | Sobremesa                | Escolha da sobremesa                           |
| `/pedido/confirmacao`          | Confirmação              | Confirmação e envio do pedido                  |
| `/pedido/pedidoConfirmado/:id` | PedidoConfirmado         | Feedback de pedido confirmado                  |
| `/pedido/:id`                  | Pedido                   | Detalhes de um pedido específico               |
| `/pedidos`                     | PedidosList              | Lista com todos os pedidos realizados          |
| `/login`                       | Login                    | Página de autenticação                         |
| `/cadastro`                    | Cadastro                 | Registro de novo usuário                       |

---

# Backend

### Tecnologias Utilizadas

- Java 17
- Spring Boot
- Spring Security (JWT)
- Spring Data JPA
- PostgreSQL
- Maven

---

### Funcionalidades Principais

- Autenticação de usuário via JWT
- Criação de pedidos vinculados a um usuário autenticado
- Consulta de pedidos por usuário
- Edição de pedidos
- Remoção de pedidos
- Consulta de pedido específico por ID

---

### Endpoints Disponíveis

| Método | Rota                     | Descrição                                       |
|--------|--------------------------|-------------------------------------------------|
| POST   | `/pedido/criar`          | Cria um novo pedido (autenticado)              |
| GET    | `/pedido/usuarioId`      | Retorna todos os pedidos do usuário logado     |
| GET    | `/pedido/{pedidoId}`     | Retorna um pedido específico por ID            |
| PUT    | `/pedido/{pedidoId}`     | Edita um pedido existente                      |
| DELETE | `/pedido/{pedidoId}`     | Deleta um pedido por ID                        |

**Todos os endpoints (exceto GET por ID) requerem o header:**

 ---
 
# Backend Authenticator

### Tecnologias Utilizadas

- Node.js
- Express
- MongoDB + Mongoose
- JWT (autenticação)
- Joi (validação)

OBS.: Restante da documentação de autenticação em um README.md dentro do diretório /auth.
