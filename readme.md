# Fakehoot API

API REST para criação de quizzes com ranking, no estilo Kahoot. Professores criam seus próprios quizzes, alunos jogam e recebem feedback imediato sobre cada resposta, e ao final são exibidos rankings de desempenho.

Projeto desenvolvido como trabalho acadêmico (tema: **Quiz com ranking**).

## Sumário

- [Sobre o projeto](#sobre-o-projeto)
- [Entidades](#entidades)
- [Casos de uso](#casos-de-uso)
- [Regras de negócio](#regras-de-negócio)
- [Tecnologias](#tecnologias)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Como rodar](#como-rodar)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Endpoints implementados](#endpoints-implementados)
- [Modelos de dados](#modelos-de-dados)
- [Status do projeto](#status-do-projeto)

## Sobre o projeto

### Problema

Professores precisam identificar as dificuldades dos alunos em determinada matéria. A Fakehoot API permite que o professor monte seus próprios modelos de quiz no estilo Kahoot, tornando esse diagnóstico descontraído e gamificado.

Durante o jogo, o aluno recebe um feedback explicando por que uma resposta está certa ou errada, transformando o quiz também em uma ferramenta de aprendizado.

## Entidades

| Entidade   | Descrição                                                        |
| ---------- | ---------------------------------------------------------------- |
| `Mestre`   | O professor. Cria e gerencia os quizzes.                         |
| `Player`   | O aluno. Joga os quizzes e aparece nos rankings.                 |
| `Pergunta` | Pertence a um quiz e possui 4 alternativas, cada uma com feedback. |

No código atual, `Mestre` e `Player` são representados pela entidade `Usuario`, diferenciada pelo campo `role` (`MESTRE` ou `PLAYER`).

## Casos de uso

1. O professor cria um quiz com perguntas.
2. Os alunos jogam o quiz e recebem feedback a cada resposta.
3. Ao final, são exibidos:
    - o ranking geral de acertos dos alunos;
    - o ranking de acertos por quiz.

## Regras de negócio

1. **Tentativas por pergunta:** cada pergunta permite no máximo 2 tentativas. Se o aluno errar, o número de tentativas aumenta e ele pode tentar novamente. Se errar em todas as tentativas, o sistema revela a resposta certa com a explicação do porquê ela é a correta e contabiliza um erro. Com isso, são formados múltiplos rankings de acordo com o número de tentativas e de erros.
2. **Estrutura do quiz:** o professor cria um quiz que possui perguntas. Cada pergunta tem 4 alternativas, e cada alternativa possui um feedback explicando ao aluno por que ela está certa ou por que não é a resposta correta.

Novas regras de negócio podem ser adicionadas ao longo do desenvolvimento.

## Tecnologias

### Em uso

- [Node.js](https://nodejs.org/) (ES Modules)
- [Express 5](https://expressjs.com/) para criação da API e das rotas
- [MongoDB](https://www.mongodb.com/) com [Mongoose](https://mongoosejs.com/) para persistência dos dados
- [bcrypt](https://www.npmjs.com/package/bcrypt) para hash de senhas
- [Helmet](https://helmetjs.github.io/) para cabeçalhos de segurança HTTP
- [CORS](https://www.npmjs.com/package/cors) para controle de quem pode acessar a API
- [dotenv](https://www.npmjs.com/package/dotenv) para variáveis de ambiente

### Instaladas, ainda não utilizadas

- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) para autenticação com tokens JWT (previsto para o login)
- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) para limitar a quantidade de requisições por cliente
- [Multer](https://www.npmjs.com/package/multer) para upload de arquivos

## Estrutura do projeto

```
api/
├── src/
│   ├── config/          # conexão com o banco de dados
│   ├── controllers/     # recebem a requisição e devolvem a resposta
│   ├── middlewares/     # validações das requisições
│   ├── models/          # schemas do Mongoose (Usuario, Quiz, Contador)
│   ├── routes/          # definição das rotas
│   ├── services/        # regras de negócio
│   ├── app.js           # configuração do Express
│   └── server.js        # inicialização do servidor
├── .env.example
└── package.json
```

## Como rodar

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- Uma instância do MongoDB (local ou [MongoDB Atlas](https://www.mongodb.com/atlas))

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/Paulozero99/fakehoot-API.git

# 2. Entre na pasta da API
cd fakehoot-API/api

# 3. Instale as dependências
npm install

# 4. Crie o arquivo .env a partir do exemplo e preencha os valores
cp .env.example .env

# 5. Inicie o servidor em modo de desenvolvimento
npm run dev
```

O servidor sobe em `http://localhost:3000` (ou na porta definida em `PORT`). Para testar, acesse `GET /`:

```json
{ "mensagem": "API Fakehoot no Ar!" }
```

## Variáveis de ambiente

| Variável      | Descrição                             | Exemplo                              |
| ------------- | ------------------------------------- | ------------------------------------ |
| `PORT`        | Porta em que o servidor vai rodar     | `3000`                               |
| `MONGODB_URI` | String de conexão com o MongoDB       | `mongodb://localhost:27017/fakehoot` |
| `JWT_SECRET`  | Segredo para assinatura de tokens JWT | `uma-chave-secreta-bem-longa`        |

## Endpoints implementados

### Auth

| Método | Rota             | Descrição                |
| ------ | ---------------- | ------------------------ |
| POST   | `/auth/register` | Cadastra um novo usuário |

**Body**

```json
{
    "nome": "Maria",
    "email": "maria@email.com",
    "senha": "minhasenha123",
    "role": "MESTRE"
}
```

**Regras:** e-mail válido, nome obrigatório e senha com no mínimo 8 caracteres (sem espaços no início ou no fim). `role` pode ser `MESTRE` ou `PLAYER`.

**Respostas:** `201` criado, `400` erro de validação, `409` e-mail já cadastrado.

---

### Usuários

| Método | Rota                     | Descrição                           |
| ------ | ------------------------ | ----------------------------------- |
| PATCH  | `/usuarios/:id`          | Atualiza nome e/ou e-mail           |
| GET    | `/usuarios/buscar?nome=` | Busca usuários pelo início do nome  |
| DELETE | `/usuarios/deletar/:id`  | Exclui um usuário                   |

**PATCH `/usuarios/:id`** (informe ao menos um campo):

```json
{
    "nome": "Novo Nome",
    "email": "novo@email.com"
}
```

Respostas: `200`, `400` validação, `404` usuário não encontrado, `409` e-mail já em uso.

**GET `/usuarios/buscar?nome=Mar`** (ignora maiúsculas e minúsculas e retorna os nomes que começam com o termo):

```json
{
    "mensagem": "Foi encontrado apenas 1 usuário",
    "usuariosEncontrados": [
        { "id": "USR-000001", "nome": "Maria", "email": "maria@email.com" }
    ]
}
```

Respostas: `200`, `400` termo não informado, `404` nenhum usuário encontrado.

**DELETE `/usuarios/deletar/:id`** (exige confirmação no body):

```json
{
    "confirmar": "EXCLUIR"
}
```

Respostas: `200`, `400` exclusão cancelada, `404` usuário não encontrado.

---

### Quizzes

| Método | Rota                      | Descrição                           |
| ------ | ------------------------- | ----------------------------------- |
| POST   | `/quizzes`                | Cria um quiz                        |
| GET    | `/quizzes`                | Lista todos os quizzes              |
| GET    | `/quizzes/buscar?titulo=` | Busca quizzes pelo início do título |
| PATCH  | `/quizzes/:id`            | Atualiza título e/ou descrição      |

**POST `/quizzes`** (apenas usuários com `role: "MESTRE"` podem criar):

```json
{
    "titulo": "Capitais do Mundo",
    "descricao": "Teste seus conhecimentos de geografia",
    "mestreId": "USR-000001"
}
```

Respostas: `201` criado, `400` validação, `403` usuário não é mestre, `404` mestre não encontrado.

**GET `/quizzes`** (retorna título, descrição e o nome do dono):

```json
[
    {
        "titulo": "Capitais do Mundo",
        "descricao": "Teste seus conhecimentos de geografia",
        "dono": "Maria"
    }
]
```

**GET `/quizzes/buscar?titulo=Cap`**

```json
{
    "mensagem": "Foi encontrado apenas 1 quiz",
    "quizzesEncontrados": [
        { "id": "QZ-000001", "titulo": "Capitais do Mundo", "descricao": "Teste seus conhecimentos de geografia" }
    ]
}
```

**PATCH `/quizzes/:id`**

```json
{
    "titulo": "Novo título",
    "descricao": "Nova descrição"
}
```

Respostas: `200`, `400` validação, `404` quiz não encontrado.

## Modelos de dados

**Usuario**

| Campo   | Tipo   | Observações                             |
| ------- | ------ | --------------------------------------- |
| `id`    | String | Gerado automaticamente (`USR-000001`)   |
| `nome`  | String | Obrigatório                             |
| `email` | String | Obrigatório, único, salvo em minúsculas |
| `senha` | String | Obrigatório, armazenada com hash        |
| `role`  | String | `MESTRE` ou `PLAYER`                    |

**Quiz**

| Campo       | Tipo   | Observações                         |
| ----------- | ------ | ----------------------------------- |
| `id`        | String | Gerado automaticamente (`QZ-000001`) |
| `titulo`    | String | Obrigatório                         |
| `descricao` | String | Opcional                            |
| `mestreId`  | String | ID do usuário `MESTRE` dono do quiz |

Ambos possuem `createdAt` e `updatedAt` automáticos.

## Status do projeto

Em desenvolvimento.

### Implementado

- [x] Cadastro de usuários com perfis `MESTRE` e `PLAYER`
- [x] Senhas armazenadas com hash
- [x] Atualização, busca por nome e exclusão de usuários
- [x] Criação de quizzes restrita a mestres
- [x] Listagem, busca por título e atualização de quizzes
- [x] Geração de IDs sequenciais legíveis
- [x] Validação das requisições por middlewares

### Em planejamento

- [ ] Entidade `Pergunta` com 4 alternativas
- [ ] Feedback em cada alternativa (por que está certa ou errada)
- [ ] Sistema de tentativas (máximo de 2 por pergunta) e contagem de erros
- [ ] Revelar a resposta certa com explicação após esgotar as tentativas
- [ ] Ranking geral de acertos dos alunos
- [ ] Ranking de acertos por quiz
- [ ] Múltiplos rankings conforme número de tentativas e erros
- [ ] Login e autenticação com JWT
- [ ] Proteção das rotas por token e por perfil
- [ ] Exclusão de quizzes
- [ ] Testes automatizados

## Licença

Este projeto ainda não possui uma licença definida.