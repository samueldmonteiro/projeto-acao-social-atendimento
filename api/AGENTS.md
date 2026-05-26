# AGENTS.md — API do Sistema de Ação Social (Anhanguera)

## Visão Geral

API REST para gerenciamento de beneficiários e categorias de atendimento de uma ação social da Faculdade Anhanguera. Desenvolvida com **NestJS 11**, **Prisma ORM 7**, **PostgreSQL 16** e **JWT**.

## Stack

| Camada       | Tecnologia                              |
| ------------ | --------------------------------------- |
| Runtime      | Node.js 24                              |
| Framework    | NestJS 11 (Express 5)                   |
| ORM          | Prisma 7 + adapter-pg                   |
| Banco        | PostgreSQL 16                           |
| Auth         | JWT (passport-jwt) + Argon2             |
| Validação    | class-validator + class-transformer     |
| Testes       | Vitest 4 + Supertest                    |
| Lint/Format  | ESLint 9 (typescript-eslint) + Prettier |

## Estrutura de Diretórios

```
api/
├── prisma/
│   ├── schema.prisma        # Schema do banco
│   ├── migrations/          # Migrações SQL
│   └── seed.ts              # Seed de usuários iniciais
├── src/
│   ├── auth/                # JWT strategy & guard
│   ├── errors/              # DomainError classes
│   ├── generated/prisma/    # Prisma Client (gerado)
│   ├── http/
│   │   ├── controllers/     # AppController, AuthController, BeneficiaryController, ServiceCategoryController, UserController
│   │   ├── decorators/      # @GetUser()
│   │   ├── dtos/            # DTOs com class-validator
│   │   └── filters/         # HttpExceptionFilter
│   ├── lib/                 # Prisma client instance (singleton)
│   ├── services/            # Business logic (AuthService, BeneficiaryService, ServiceCategoryService, UserService, ExportService)
│   └── types/               # Tipos globais
├── test/                    # Testes (unit, int, e2e)
│   ├── setup.ts             # Setup: schema PostgreSQL isolado por run
│   ├── auth/
│   ├── beneficiary/
│   ├── service-category/
│   ├── user/
│   └── export/
├── vitest.config.mts
├── eslint.config.mjs
└── tsconfig.json
```

## Principais Entidades

- **User** — `id`, `name`, `email` (unique), `password` (argon2), `role` (ATTENDANT | ADMIN)
- **Beneficiary** — `id`, `fullName`, `cpf` (unique), `email`, `phone`, `birthDate`, `gender` (MALE | FEMALE | OTHER)
- **ServiceCategory** — `id`, `name` (unique)
- **BeneficiaryCategory** — join table N:N entre beneficiary e service_category (cascade delete)

## Comandos

```bash
npm run start:dev      # Desenvolvimento com hot-reload
npm run build          # Compilar para dist/
npm run start:prod     # Rodar produção
npm run lint           # ESLint (2 espaços, aspas simples, ponto-e-vírgula)
npm run lint:fix       # Auto-fix
npm run format         # Prettier
npm run seed           # Popular usuários iniciais
npm run test           # Vitest (unit + int + e2e)
npm run test:cov       # Testes com cobertura
npm run test:watch     # Testes em modo watch
npm run prisma:studio  # Prisma Studio na porta 5555
```

## Convenções de Código

- **2 espaços** indentação, **aspas simples**, **ponto-e-vírgula** obrigatório
- **Trailing commas** em multiline
- **Chaves com espaços internos**: `{ foo }`, `{ bar }`
- **Sem espaços** dentro de colchetes: `[1, 2]`
- **strict: true** no TypeScript, mas `no-explicit-any` e `no-unsafe-argument` desligados
- Path alias `@/` → `src/` (ex: `import { PrismaService } from '@/lib/prisma'`)
- DTOs com `class-validator` + decorators do Swagger (`@ApiProperty`)
- Serviços registrados como `@Injectable()` no `AppModule`
- Erros de domínio usam classes que estendem `DomainError` com status HTTP (401, 404, 409)
- Resposta padronizada: `{ code, ok, message, data? }`
- Prisma queries com logging em dev

## Padrão de Testes
Ao rodar os testes, execute pelo container: docker exec -it atendimento-api (restante...)
- **int**: `test/**/*.int-spec.ts` — com banco real (schema isolado)
- **e2e**: `test/**/*.e2e-spec.ts` — requests HTTP reais com Supertest
- Setup cria schema PostgreSQL único (`test_<uuid>`) e roda migrate, depois dropa no `afterAll`

## Endpoints da API

| Método | Rota                                    | Descrição                  |
| ------ | --------------------------------------- | -------------------------- |
| GET    | `/`                                     | Health check               |
| POST   | `/auth/signin`                          | Login (email+password)     |
| GET    | `/users`                                | Listar usuários            |
| GET    | `/beneficiaries`                        | Listar (search, page, perPage, serviceCategoryId) |
| GET    | `/beneficiaries/:id`                    | Obter beneficiário         |
| POST   | `/beneficiaries`                        | Criar beneficiário         |
| PATCH  | `/beneficiaries/:id`                    | Atualizar beneficiário     |
| DELETE | `/beneficiaries/:id`                    | Remover beneficiário       |
| POST   | `/beneficiaries/:id/categories`         | Vincular categoria         |
| DELETE | `/beneficiaries/:id/categories/:catId`  | Desvincular categoria      |
| GET    | `/beneficiaries/export`                 | Exportar XLSX              |
| GET    | `/categories`                           | Listar categorias          |
| GET    | `/categories/:id`                       | Obter categoria            |
| POST   | `/categories`                           | Criar categoria            |
| PATCH  | `/categories/:id`                       | Atualizar categoria        |
| DELETE | `/categories/:id`                       | Remover categoria          |

Todas as rotas (exceto `/` e `/auth/signin`) exigem header `Authorization: Bearer <token>`.

## Fluxo de Desenvolvimento

1. Ajustar `prisma/schema.prisma`
2. `npx prisma migrate dev --name <nome>` — gera migration + client
3. `npm run seed` para popular dados
4. `npm run start:dev` para desenvolver
5. `npm run lint` + `npm run test` antes de commit
