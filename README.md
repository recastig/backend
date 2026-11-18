# Cineroleta — Backend

API REST desenvolvida para o **Cineroleta**, uma aplicação de descoberta e recomendação de filmes que combina pesquisa na TMDB com uma roleta de sorteio.

O backend é responsável pelo gerenciamento de usuários, autenticação e armazenamento de filmes favoritos, utilizando Node.js, Express e MongoDB.

## Tecnologias utilizadas

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
- dotenv
- Nodemon
- ESLint (Airbnb Base)

## Funcionalidades

- Cadastro de usuários com validação dos dados.
- Armazenamento seguro de senhas utilizando hash.
- Login com autenticação JWT.
- Consulta aos dados do usuário autenticado.
- Cadastro, listagem e exclusão de filmes favoritos.
- Associação dos favoritos ao usuário responsável.
- Prevenção de filmes duplicados por usuário.
- Proteção de rotas privadas.
- Controle de permissões para exclusão de favoritos.
- Tratamento centralizado de erros HTTP.
- Cabeçalhos de segurança com Helmet.
- Limitação de requisições por endereço IP.
- Registro de requisições e respostas de erro.

## API publicada

A API está hospedada no Render e disponível via HTTPS.

**URL:** https://cineroleta-api.onrender.com

**Health check:**

```http
GET https://cineroleta-api.onrender.com/api/health
```

Resposta esperada:

```json
{
  "status": "ok",
  "message": "API Cineroleta funcionando!"
}
```

> No plano gratuito do Render, a primeira requisição após um período de inatividade pode demorar devido à inicialização do serviço.

## Endpoints

Todas as rotas da aplicação utilizam o prefixo `/api`.

### Autenticação e usuários

| Método | Endpoint | Descrição | Autenticação |
|---|---|---|---|
| POST | `/api/signup` | Cadastrar um usuário | Pública |
| POST | `/api/signin` | Autenticar usuário e gerar JWT | Pública |
| GET | `/api/users/me` | Consultar usuário autenticado | JWT |

### Filmes favoritos

| Método | Endpoint | Descrição | Autenticação |
|---|---|---|---|
| GET | `/api/movies` | Listar favoritos do usuário | JWT |
| POST | `/api/movies` | Adicionar filme aos favoritos | JWT |
| DELETE | `/api/movies/:movieId` | Excluir favorito pelo ID do MongoDB | JWT |

As rotas protegidas exigem o cabeçalho:

```http
Authorization: Bearer TOKEN_JWT
```

### Cadastro de usuário

**POST `/api/signup`**

Exemplo de requisição:

```json
{
  "name": "Usuário Exemplo",
  "email": "usuario@example.com",
  "password": "SenhaExemplo123!"
}
```

Resposta de sucesso — `201 Created`:

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Usuário Exemplo",
  "email": "usuario@example.com"
}
```

A senha é armazenada como hash no banco de dados e não é retornada pela API.

### Login

**POST `/api/signin`**

Exemplo de requisição:

```json
{
  "email": "usuario@example.com",
  "password": "SenhaExemplo123!"
}
```

Resposta de sucesso — `200 OK`:

```json
{
  "token": "TOKEN_JWT"
}
```

O token JWT é utilizado para autenticar solicitações às rotas privadas.

### Consultar usuário autenticado

**GET `/api/users/me`**

Cabeçalho obrigatório:

```http
Authorization: Bearer TOKEN_JWT
```

Resposta de sucesso — `200 OK`:

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Usuário Exemplo",
  "email": "usuario@example.com"
}
```

### Adicionar filme favorito

**POST `/api/movies`**

Cabeçalho obrigatório:

```http
Authorization: Bearer TOKEN_JWT
```

Exemplo de requisição:

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

O campo `owner` é associado automaticamente ao usuário autenticado.

Cada usuário pode salvar um mesmo filme apenas uma vez, enquanto usuários diferentes podem favoritar o mesmo título.

### Listar filmes favoritos

**GET `/api/movies`**

Retorna os filmes salvos pelo usuário autenticado, ordenados do mais recente para o mais antigo.

### Excluir filme favorito

**DELETE `/api/movies/:movieId`**

O parâmetro `movieId` corresponde ao `_id` gerado pelo MongoDB, não ao identificador da TMDB.

A exclusão é permitida somente ao proprietário do favorito.

Resposta de sucesso:

```json
{
  "message": "Filme removido dos favoritos."
}
```

## Códigos de resposta HTTP

| Código | Significado |
|---|---|
| `200` | Requisição realizada com sucesso |
| `201` | Recurso criado |
| `400` | Dados inválidos |
| `401` | Autenticação ausente ou inválida |
| `403` | Operação não permitida |
| `404` | Recurso não encontrado |
| `409` | Conflito ou recurso duplicado |
| `429` | Limite de requisições excedido |
| `500` | Erro interno do servidor |

Os erros são tratados por um middleware centralizado, com mensagens apropriadas e sem exposição de informações técnicas sensíveis.

## Executar localmente

### Pré-requisitos

- Node.js e npm instalados.
- Acesso a um banco MongoDB.
- Variáveis de ambiente configuradas.

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

Crie o arquivo `.env` na raiz do projeto:

```dotenv
PORT=3000
MONGODB_URI=sua_string_de_conexao_mongodb
JWT_SECRET=sua_chave_secreta_jwt
```

As credenciais reais não devem ser adicionadas ao controle de versão.

Para gerar uma chave JWT aleatória, execute:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Iniciar o servidor

Modo de desenvolvimento, com reinicialização automática:

```bash
npm run dev
```

Modo normal:

```bash
npm start
```

Por padrão, o servidor local estará disponível em:

http://localhost:3000

Para verificar seu funcionamento:

http://localhost:3000/api/health

### Verificar o código

Execute o ESLint:

```bash
npm run lint
```

O projeto utiliza a configuração Airbnb Base.

## Estrutura do projeto

```text
backend/
├── controllers/
│   ├── users.js
│   └── movies.js
├── middlewares/
│   ├── auth.js
│   ├── errorHandler.js
│   ├── rateLimiter.js
│   ├── requestLogger.js
│   └── validateRequest.js
├── models/
│   ├── user.js
│   └── movie.js
├── routes/
│   ├── index.js
│   ├── users.js
│   └── movies.js
├── utils/
│   └── errors/
│       ├── ApiError.js
│       ├── BadRequestError.js
│       ├── UnauthorizedError.js
│       ├── ForbiddenError.js
│       ├── NotFoundError.js
│       ├── ConflictError.js
│       └── index.js
├── .editorconfig
├── .env.example
├── .eslintrc.json
├── .gitignore
├── app.js
├── index.js
├── package.json
├── package-lock.json
└── README.md
```

## Segurança

A API implementa medidas de segurança para proteger contas e dados dos usuários:

- Hash de senhas com bcryptjs.
- Autenticação por JWT.
- Validação de dados com express-validator e Mongoose.
- Middleware de autorização para rotas privadas.
- Verificação de propriedade dos filmes favoritos.
- Índice de unicidade para evitar favoritos duplicados.
- Cabeçalhos HTTP de segurança com Helmet.
- Rate limiting por endereço IP.
- Tratamento centralizado de erros.
- Variáveis de ambiente para informações sensíveis.
- Exclusão de arquivos `.env` e logs do controle de versão.

## Logs

O projeto utiliza Morgan para registrar requisições e respostas HTTP.

Os registros são organizados em dois arquivos:

- `request.log`: histórico de requisições e respostas.
- `error.log`: requisições que resultaram em códigos HTTP de erro.

Os arquivos `.log` são ignorados pelo Git.

## Deploy

O backend está hospedado no Render, com banco de dados MongoDB Atlas.

A implantação utiliza:

- Branch de desenvolvimento: `stage-backend-api`.
- Comando de instalação: `npm ci`.
- Comando de inicialização: `npm start`.
- Variáveis de ambiente configuradas no Render.
- Comunicação HTTPS.
- Acesso ao MongoDB autorizado pela lista de IPs do Atlas.

## Frontend

O frontend do Cineroleta foi desenvolvido com React e Vite e utiliza a API TMDB para pesquisa e descoberta de filmes.

**Repositório:** https://github.com/recastig/cineroleta-frontend

A integração entre frontend e backend, incluindo autenticação, sessão de usuário e favoritos na interface, será realizada na Fase 3 do projeto.

## Desenvolvimento

Projeto desenvolvido como parte da formação em Desenvolvimento Web da TripleTen.

O Cineroleta utiliza repositórios independentes para frontend e backend, permitindo desenvolvimento, versionamento e deploy separados.

## Licença

Projeto desenvolvido para fins educacionais e de portfólio.
