# Back-end My Sales

## 📌 Descrição
Este é o back-end de um sistema de vendas, fornecendo endpoints para gestão de usuários, sessões, pedidos, produtos e clientes. A API segue os princípios RESTful e utiliza autenticação JWT.

## 🚀 Funcionalidades
- Cadastro e autenticação de usuários
- Gerenciamento de produtos
- Cadastro e gestão de clientes
- Criação e consulta de pedidos
- Atualização de perfil do usuário

## 🛠️ Tecnologias Utilizadas
- **Node.js**
- **Express**
- **TypeScript**
- **TypeORM**
- **PostgreSQL**
- **JWT (JSON Web Token)**
- **Redis** (cache)
- **Docker**

## ⚙️ Instalação
### 📥 Pré-requisitos
- Node.js (v16+)
- Docker e Docker Compose (opcional, mas recomendado)

### 📌 Passos
1. Clone o repositório:
   ```sh
   git clone https://github.com/lucikelly/back-end_my-sales.git
   cd back-end_my-sales
   ```

2. Instale as dependências:
   ```sh
   npm install
   ```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` baseado no `.env.example` e preencha com suas configurações.

4. Execute as migrações do banco de dados:
   ```sh
   npm run typeorm migration:run
   ```

5. Inicie o servidor:
   ```sh
   npm run dev
   ```

O servidor estará rodando em `http://localhost:3333`.

## 📡 Rotas da API
### 🔑 Autenticação
- **POST /sessions** → Autentica um usuário e retorna um token JWT.

### 👤 Usuários
- **POST /users** → Cria um novo usuário.
- **GET /profile** → Retorna os dados do usuário autenticado.
- **PUT /profile** → Atualiza o perfil do usuário autenticado.

### 🛍️ Produtos
- **POST /products** → Cria um novo produto.
- **GET /products** → Lista todos os produtos.
- **PUT /products/:id** → Atualiza um produto.
- **DELETE /products/:id** → Remove um produto.

### 🏬 Clientes
- **POST /customers** → Cadastra um cliente.
- **GET /customers** → Lista clientes cadastrados.

### 📦 Pedidos
- **POST /orders** → Cria um novo pedido.
- **GET /orders/:id** → Consulta um pedido pelo ID.

## 🛠 Testes
Para rodar os testes automatizados:
```sh
npm test
```


💡 _Dúvidas ou sugestões? Fique à vontade para abrir uma issue no repositório!_ 🚀

