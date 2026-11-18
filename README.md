# Cineroleta — Backend

API REST desenvolvida para o Cineroleta, uma aplicação de descoberta e recomendação de filmes que combina pesquisa na TMDB com uma roleta de sorteio.

O backend é responsável pelo gerenciamento de usuários, autenticação e armazenamento de filmes favoritos, utilizando Node.js, Express e MongoDB.

## Tecnologias

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- express-validator
- Helmet
- express-rate-limit
- Morgan
- ESLint (Airbnb Base)

## Funcionalidades

- Cadastro de usuários com validação dos dados.
- Armazenamento seguro de senhas utilizando hash.
- Login com autenticação JWT.
- Consulta aos dados do usuário autenticado.
- Cadastro, listagem e exclusão de filmes favoritos.
- Associação dos favoritos ao usuário responsável.
- Prevenção de filmes duplicados por usuário.
- Proteção das rotas privadas.
- Tratamento centralizado de erros HTTP.
- Cabeçalhos de segurança com Helmet.
- Limitação de requisições por IP.
- Registro de requisições e respostas de erro.

## API publicada

**Render:** https://cineroleta-api.onrender.com

**Verificação de funcionamento:**

GET https://cineroleta-api.onrender.com/api/health

## Endpoints

### Autenticação e usuários

| Método | Endpoint | Descrição | Autenticação |
|---|---|---|---|
| POST | /signup | Cadastrar usuário | Não |
| POST | /signin | Autenticar usuário e gerar JWT | Não |
| GET | /users/me | Consultar usuário atual | Sim |

### Filmes favoritos

| Método | Endpoint | Descrição | Autenticação |
|---|---|---|---|
| GET | /movies | Listar favoritos do usuário | Sim |
| POST | /movies | Adicionar filme aos favoritos | Sim |
| DELETE | /movies/:movieId | Excluir favorito pelo ID do MongoDB | Sim |

As rotas protegidas exigem o cabeçalho:

Authorization: Bearer TOKEN_JWT

### Exemplo de cadastro

POST /signup

```json
{
  "name": "Usuário Exemplo",
  "email": "usuario@example.com",
  "password": "SenhaExemplo123!"
}
```

### Exemplo de login

POST /signin

```json
{
  "email": "usuario@example.com",
  "password": "SenhaExemplo123!"
}
```

Resposta de sucesso:

```json
{
  "token": "TOKEN_JWT"
}
```

### Exemplo de filme favorito

POST /movies

```json
{
  "tmdbId": 550,
  "title": "Clube da Luta",
  "overview": "Sinopse do filme.",
  "posterPath": "",
  "releaseDate": "1999-10-15",
  "voteAverage": 8.4
}
```

O backend associa automaticamente o filme ao usuário autenticado.

## Executar localmente

### Pré-requisitos

- Node.js e npm
- Acesso a um banco MongoDB
- Variáveis de ambiente configuradas

### Instalação

Clone o repositório:

```bash
git clone https://github.com/recastig/cineroleta-backend.git
cd cineroleta-backend
```

Instale as dependências:

```bash
npm ci
```

Crie um arquivo `.env` na raiz:

```dotenv
PORT=3000
MONGODB_URI=sua_string_de_conexao_mongodb
JWT_SECRET=sua_chave_secreta_jwt
```

A variável `JWT_SECRET` deve conter uma chave aleatória e segura.

Inicie o servidor em modo de desenvolvimento:

```bash
npm run dev
```

Ou em modo normal:

```bash
npm start
```

A API estará disponível em:

http://localhost:3000

### Verificação do código

```bash
npm run lint
```

## Segurança

- As senhas são armazenadas como hash e não são retornadas pela API.
- Tokens JWT são utilizados na autenticação.
- Rotas privadas exigem autorização.
- Usuários não podem excluir favoritos de outras contas.
- Dados recebidos são validados antes do processamento.
- Erros internos não expõem informações técnicas sensíveis.
- Helmet configura cabeçalhos HTTP de segurança.
- Rate limiting restringe requisições excessivas.
- Arquivos `.env` e logs não são versionados.

## Estrutura do projeto

```text
backend/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── utils/
│   └── errors/
├── app.js
├── index.js
├── package.json
└── README.md
```

## Deploy

A API está hospedada no Render, utilizando MongoDB Atlas como banco de dados.

As configurações sensíveis são fornecidas por variáveis de ambiente no servidor e não são armazenadas no repositório.

## Frontend

O frontend do Cineroleta foi desenvolvido com React e Vite e utiliza a API TMDB para pesquisa e descoberta de filmes.

Repositório: https://github.com/recastig/cineroleta-frontend

A integração de autenticação e favoritos com o frontend faz parte da próxima etapa do projeto.

## Desenvolvimento

Projeto desenvolvido como parte da formação em desenvolvimento web da TripleTen.

A aplicação está organizada em repositórios independentes para frontend e backend.
