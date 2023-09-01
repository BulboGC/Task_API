# API GYM

**Descrição:** Esta API permite gerenciar usuários e seus dados. Foi desenvolvida utilizando o framework Express do Node.js e o banco de dados MongoDB com a biblioteca Mongoose. A autenticação JWT (Json Web Token) é utilizada para garantir a segurança das rotas.

## Endpoints

### Cadastro de Usuários

**Rota:** `POST /signin`
**Descrição:** Cadastra novos usuários na aplicação.
**Parâmetros:** Objeto JSON no corpo da requisição com nome, email e senha.
**Resposta:** Status de sucesso ou erro.

### Login de Usuários

**Rota:** `POST /login`
**Descrição:** Permite que usuários façam login.
**Parâmetros:** Objeto JSON no corpo da requisição com email e senha.
**Resposta:** Token JWT para autenticação.



## Dependências

- `express`: Biblioteca Node.js para criar APIs web.
- `mongoose`: Biblioteca Node.js para interagir com o MongoDB.
- `cors`: Middleware para habilitar o CORS em requisições HTTP.
- `jsonwebtoken (jwt)`: Biblioteca Node.js para autenticação com tokens JWT.
- `nodemon`: Biblioteca de desenvolvimento para reiniciar o servidor automaticamente.
- `dotenv`: Biblioteca para carregar variáveis de ambiente.

## Configuração

- **Porta:** A aplicação utiliza a porta 4000.
- **Conexão com Banco de Dados:** Feita através de `./DB/db.js` com o Mongoose.
- **Autenticação JWT:** Implementada em `./middlewares/jwt.js` para proteger rotas.
- **Controladores:** Implementados em `./controller/User.js`.
- **Variáveis de Ambiente:** Configurações precisam ser definidas no `.env`.

## Postman

- [Link para a coleção no Postman](https://restless-rocket-722930.postman.co/workspace/Team-Workspace~af464cc5-7a2d-4447-8387-5c2e6f7ead4c/collection/22658973-74a9f9f5-de80-4702-822d-864c14b2e76e?action=share&creator=22658973)
