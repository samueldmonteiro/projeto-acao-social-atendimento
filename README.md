# Projeto Ação Social - Atendimento

Este projeto consiste em um sistema de atendimento desenvolvido com uma API robusta em **NestJS** e um Frontend moderno com **React Router v7**. 

O repositório é estruturado para facilitar o desenvolvimento local e o deploy via Docker:
- [`api`](./api): Backend em NestJS com Prisma e PostgreSQL.
- [`frontend`](./frontend): Interface web em React com TailwindCSS (via React Router).

---

## 🛠 Pré-requisitos

Para rodar o projeto, você precisará de:
1. **Docker** e **Docker Compose** (Versão recomendada)
2. **Node.js** (v22+) e **yarn** (apenas se for rodar sem Docker)

---

## 🐳 1. Rodando com Docker (Recomendado)

Esta é a forma mais rápida e profissional de subir todo o ambiente (Banco, API e Frontend) com **Hot-Reload** ativo e sincronização de permissões de arquivos.

### Passo 1: Configurar Variáveis de Ambiente
Na raiz do projeto, crie um arquivo `.env` baseado no exemplo:
```bash
cp .env.example .env
```

**⚠️ Importante (Linux):** Para evitar problemas de permissão ao editar arquivos, verifique seu UID e GID rodando `id -u` e `id -g` no terminal e atualize os valores no seu `.env`:
- `DOCKER_UID`: Seu UID (geralmente 1000)
- `DOCKER_GID`: Seu GID (geralmente 1000)

### Passo 2: Subir os Containers
Execute o comando abaixo para construir e iniciar todos os serviços em segundo plano:
```bash
docker compose up -d --build
```

### Passo 3: Acessar o Sistema
- **Frontend**: [http://localhost:5173](http://localhost:5173) (Vite HMR ativo)
- **API (Swagger/Docs)**: [http://localhost:3000/api](http://localhost:3000/api)
- **PostgreSQL**: `localhost:5432` (Acessível via ferramentas como DBeaver ou TablePlus)

---

## 💻 2. Desenvolvimento Local (Sem Docker)

Caso prefira rodar os serviços manualmente em sua máquina:

### API (Backend)
1. Navegue até a pasta: `cd api`
2. Instale as dependências: `yarn install`
3. Certifique-se de ter um banco Postgres rodando (pode usar `docker compose up -d postgres`)
4. Execute as migrations: `npx prisma migrate dev`
5. Inicie o servidor: `yarn run start:dev`

### Frontend
1. Navegue até a pasta: `cd frontend`
2. Instale as dependências: `yarn install`
3. Inicie o servidor: `yarn run dev`

---

## 🛠 Comandos Úteis (Docker)

- **Ver logs**: `docker compose logs -f`
- **Acessar o terminal da API**: `docker compose exec api sh`
- **Rodar migrations manualmente**: `docker compose exec api yarn prisma migrate dev`
- **Parar tudo e remover volumes**: `docker compose down -v`

---

## 🚀 Workflows e CI (GitHub Actions)

O projeto possui integração contínua configurada:
- **`ci-api.yml`**: Roda o linter e testes automatizados.
- **`ci-frontend.yml`**: Valida a tipagem e o processo de build.

Os testes são executados automaticamente em cada *Pull Request* para a branch `main`.
