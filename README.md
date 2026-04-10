# Projeto Ação Social - Atendimento

Este projeto consiste em um sistema de atendimento desenvolvido com uma API robusta em **NestJS** e um Frontend moderno com **React Router v7**. 

O repositório é dividido em duas pastas principais:
- [`api`](./api): Backend em NestJS com Prisma e PostgreSQL.
- [`frontend`](./frontend): Interface web em React com TailwindCSS (via React Router).

---

## 🛠 Pré-requisitos globais

Para rodar o projeto localmente, certifique-se de ter instalado:
1. **Node.js** (versão 22 ou superior)
2. **pnpm** (versão 9+)
3. **Docker** e **Docker Compose** (para subir o banco de dados localmente)

---

## 1. Passo a Passo: API (Backend)

A API é o coração do sistema, fornecendo as rotas e regras de negócio usando NestJS e conectando ao banco de dados com Prisma ORM.

### Instalação
Abra o terminal, navegue até a pasta da API e instale as dependências:
```bash
cd api
pnpm install
```

### Configuração do Banco de Dados
A API precisa de um PostgreSQL ativo. Primeiro, suba o container usando o Docker Compose:
```bash
docker compose up -d
```
Verifique o arquivo `.env` para confirmar se as configurações estão corretas (a URL padrão usada é `postgresql://admin_s324:pass1@localhost:5432/atendimento?schema=public`).  

Rode as migrações para criar as tabelas do banco de dados e aplicar gerações pendentes do Prisma:
```bash
npx prisma migrate dev
```

### Rodando a API
Para rodar a API em modo de desenvolvimento (com auto-reload):
```bash
pnpm run start:dev
```
*A API ficará disponível por padrão na porta `3000` (ex: `http://localhost:3000`).*

### Testes
A API utiliza o **Vitest** para seus testes (unitários, integração e E2E).  
> **⚠️ Importante:** Para que os testes de integração/E2E funcionem, o container do PostgreSQL na etapa anterior (`docker compose up -d`) deve estar ativo, pois os testes se conectam ao banco e criam tabelas temporárias com Prisma usando uma URL de conexão validada pelo `.env` da API.

Comandos disponíveis (certifique-se de estar dentro da pasta `api/`):
- **Rodar todos os testes de uma vez**: `pnpm run test`
- **Rodar em modo "Watch"** (re-executa testes interativamente ao salvar arquivos): `pnpm run test:watch`
- **Gerar relatório de cobertura de código (*coverage*)**: `pnpm run test:cov`

### Linter e Formatação
Para assegurar a qualidade e padronização do código da API:
- **Apenas analisar e procurar erros**: `pnpm run lint`
- **Corrigir erros automaticamente** (auto-fixer do ESLint): `pnpm run lint:fix`

---

## 2. Passo a Passo: Frontend

O frontend consome a API para alimentar as interfaces de usuário utilizando os loaders e actions do React Router.

### Instalação
Em uma nova aba do terminal, navegue até a pasta do Frontend e instale as dependências:
```bash
cd frontend
pnpm install
```

### Rodando o Frontend
Para subir o ambiente de desenvolvimento local (Vite/React Router):
```bash
pnpm run dev
```
*O frontend ficará disponível por padrão na porta `5173` (ex: `http://localhost:5173`).*

### Linter e Tipagem (TypeScript)
O Frontend possui scripts essenciais para a qualidade do código:
- **Verificação de Tipagem (Typecheck)**: `pnpm run typecheck`
- **Linter**: `pnpm run lint`

### Build para Produção
Caso queira compilar o frontend para produção:
```bash
pnpm run build
pnpm run start
```

---

## 🚀 Workflows e CI (GitHub Actions)

Este projeto já possui integração contínua (CI) configurada usando GitHub Actions para garantir a saúde do repositório tanto no backend quanto no frontend:
- **`ci-api.yml`**: Roda o *linter*, gera o script Prisma e os *testes* (subindo um container efêmero de banco de dados e as migrações dinâmicas).
- **`ci-frontend.yml`**: Roda a instalação, o *linter*, avaliação de tipos (*typecheck*) e o processo de *build*.

Os testes são executados automaticamente ao submeter qualquer alteração por *Pull Request* ou *Push* para a branch `main`.
