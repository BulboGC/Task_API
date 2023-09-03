# Task_API

sistema de gestão de tarefas, com um sistema simples de login para o controle de usuarios.

## Documentação

A documentação completa do programa está disponível [aqui](https://documenter.getpostman.com/view/22658973/2s9Y5ctg6q).

## Instalação

É necessário ter instalado:
 - Node
 - MongoDB

Para instalar as dependencias utilize esse comando na raiz do projeto:

```
npm install
```


## Configuração
é necessário criar um arquivo .env na raiz do projeto.
ele é o arquivo que enviará as variaveis de ambiente ao projeto:
ele deve conter as seguintes informações:

```
DB_HOST=<Seuip ou localhost/>
DB_PORT=<Porta/>
DB_NAME=<Nome do Banco/>
JWT_SECRET=<Uma senha secreta para o JWT/>
BCRYPT_HASH_ROUNDS=<quantidade de vezes de hash/>
```

## Inicialização

Para inicializar o projeto pode utilizar o comando:

```
node index.js
```

Ou caso deseje fazer alterações pode utilizar o:

```
npm start
```
com "npm start" o projeto será iniciado com nodemon para reiniciar o projeto a cada alteração salva.

## Organização das pastas

O projeto foi organizado assim:

- **Controllers**: Contém controladores para manipular a lógica de negócios da aplicação.
  - `TaskController.js`: Controlador para tarefas.
  - `UserController.js`: Controlador para usuários.

- **DB**: Contém arquivos relacionados ao banco de dados.
  - `db.js`: Arquivo de configuração e conexão com o banco de dados.

- **Middlewares**: Contém middlewares utilizados na aplicação.
  - `jwt.js`: Middleware para autenticação JWT.

- **Models**: Contém modelos de dados da aplicação.
  - `ModelTask.js`: Modelo para tarefas.
  - `ModelUser.js`: Modelo para usuários.

- **Router**: Contém os roteadores da aplicação.
  - **v1**: Roteador para a versão 1 da API.
    - `v1.js`: Arquivo de configuração do roteador da versão 1.

- **Services**: Contém serviços utilizados pela aplicação.
  - `authService.js`: Serviço de autenticação.
  - `TaskService.js`: Serviço para operações relacionadas a tarefas.
  - `UserService.js`: Serviço para operações relacionadas a usuários.

- **Arquivo Principal**: 
  - `index.js`: Arquivo principal da aplicação.

## Autor
Gabriel Coutinho


## Utilização
Caso deseje testar a api instalada pode utilizar as rotas pré-criadas no postman entrando na documentação e clicando em run in Postman na parte de cima na direita, você tem acesso as rotas que mapeei.









