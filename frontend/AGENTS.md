# Aplicação — Dashboard de Atendimento para Ação Social

## Stack

| Camada        | Tecnologia                                              |
| ------------- | ------------------------------------------------------- |
| Framework     | React 19                                                |
| Build         | Vite 8                                                  |
| Roteamento    | React Router v7 (SPA mode, SSR desligado)              |
| Estilo        | Tailwind CSS v4 (`@import "tailwindcss"`, sem PostCSS) |
| UI Library    | shadcn/ui (Radix primitives + `cn()` helper)            |
| Server state  | TanStack React Query v5                                 |
| HTTP          | Axios                                                   |
| State global  | Zustand v5 + persist (localStorage)                     |
| Toast         | Sonner                                                  |
| Linguagem     | TypeScript 5.9 (strict mode)                            |
| Path alias    | `@/` → `./app/`                                         |
| Lint          | ESLint (single quotes, ponto e vírgula, indent 2 espaços) |

---

## Estrutura de pastas

```
app/
├── root.tsx                        # Root layout (QueryClientProvider, Toaster)
├── routes.ts                       # Config de rotas
├── app.css                         # Estilos globais (Tailwind)
├── components/
│   ├── layouts/
│   │   ├── main-layout.tsx         # Navbar + Outlet + Footer
│   │   └── protected-layout.tsx    # Guard de autenticação
│   ├── ui/                         # shadcn/ui components
│   ├── navbar/index.tsx
│   └── footer/index.tsx
├── hooks/
│   ├── queries/                    # TanStack Query hooks
│   │   └── use-users.ts
│   └── store/                      # Zustand stores
│       └── use-auth.ts
├── lib/
│   └── http.ts                     # Axios instance + interceptors
├── pages/
│   ├── home.tsx                    # Dashboard
│   ├── login.tsx                   # Login
│   └── users/index.tsx             # Listagem de usuários
├── services/
│   ├── auth.service.ts
│   └── user.service.ts
└── types/
    ├── api.type.ts                 # ApiResponse<T>
    ├── auth.type.ts                # LoginCredentials, LoginResponse
    └── user.type.ts                # User, UserSafe
```

---

## Convenções de código

### ESLint
- Strings com aspas simples (`'exemplo'`)
- Ponto e vírgula obrigatório ao final
- Indentação de 2 espaços
- `no-explicit-any` desligado (evitar `any` sempre que possível)
- `verbatimModuleSyntax: true` — usar `import type` para imports tipo-only

### Nomenclatura
| O quê                | Padrão         | Exemplo                          |
| -------------------- | -------------- | -------------------------------- |
| Pastas/arquivos      | kebab-case     | `user.service.ts`                |
| Componentes          | PascalCase     | `Navbar`, `MainLayout`           |
| Hooks                | camelCase      | `useUsers`, `useAuthStore`       |
| Services             | camelCase      | `userService`, `authService`     |
| Types/Interfaces     | PascalCase     | `ApiResponse<T>`, `User`         |
| Páginas              | `index.tsx`    | `pages/users/index.tsx`          |
| Componente           | `index.tsx`    | `components/navbar/index.tsx`    |

### Ordem de imports
1. React / bibliotecas externas
2. Componentes
3. Hooks
4. Serviços / libs
5. Tipos
6. CSS (raro, pois usa Tailwind)

---

## Padrão de componentes

```tsx
// components/foo/index.tsx
import { type ReactNode } from 'react';

interface FooProps {
  title: string;
  children?: ReactNode;
}

export function Foo({ title, children }: FooProps) {
  return (
    <div className="...">
      <h2>{title}</h2>
      {children}
    </div>
  );
}
```

- Componentes são **functions**, não arrow functions
- Props com interface no mesmo arquivo
- Sem comments a menos que necessário
- Apenas Tailwind, sem CSS modules ou styled-components
- Componentes de UI devem vir de `@/components/ui/` (shadcn) ou ser compostos a partir deles

---

## Padrão de páginas

```tsx
// pages/exemplo/index.tsx
import { useQuery } from '@tanstack/react-query';
import { algumService } from '@/services/algum.service';

export default function ExemploPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['exemplo', 'list'],
    queryFn: algumService,
  });

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar.</div>;

  return <div>{/* conteúdo */}</div>;
}
```

- Toda página: `export default function NomePage()`
- Nunca chamar serviço direto — sempre query hook
- Tratar loading, error, empty, sucesso

---

## Padrão Service + Query

### Service
```ts
// services/beneficiary.service.ts
import { http } from '@/lib/http';
import type { ApiResponse, PaginationMeta } from '@/types/api.type';
import type { Beneficiary, BeneficiaryWithAppointments, CreateBeneficiary, UpdateBeneficiary } from '@/types/beneficiary.type';

export const BeneficiaryService = {
  getAll: async (): Promise<ApiResponse<PaginationMeta<BeneficiaryWithAppointments[]>>> => {
    const response = await http.get<ApiResponse<PaginationMeta<BeneficiaryWithAppointments[]>>>('/beneficiaries');
    return response.data;
  },

```

### Query hook
```ts
// hooks/queries/use-beneficiaries.ts
import { useQuery } from '@tanstack/react-query';
import { BeneficiaryService } from '@/services/beneficiary.service';

export function useBeneficiaries() {
  return useQuery({
    queryKey: ['beneficiaries', 'list'],
    queryFn: BeneficiaryService.getAll(),
    staleTime: 1000 * 60 * 5, // 5 min
    retry: 2,
  });
}
```

- Cada service tem uma query hook correspondente
- Query key: `['recurso', 'subrecurso']`

---

## Tipos

```ts
// types/foo.type.ts
export type Foo = {
  id: string;
  name: string;
};
```

- `api.type.ts` contém `ApiResponse<T>` genérico
- Preferir `type` a `interface`

---

## Fluxo de dados

```
Página → useQuery → service → API REST → ApiResponse<T>
                              ↑
                    Zustand store (auth)
                    Axios interceptor (token)
```

- **Estado servidor**: TanStack Query (cache, stale, refetch)
- **Estado global**: Zustand + persist (apenas sessão/auth)
- **HTTP**: Axios instance única com interceptors

---

## Rotas

```
root.tsx (QueryClientProvider + Toaster)
├── /login → pages/login.tsx (pública, sem layout)
└── protected-layout (guarda de auth)
    └── main-layout (Navbar + Footer)
        ├── / → home.tsx
        └── /usuarios → users/index.tsx
```

---

## Sistema de design

### Cores
- Fundo: `bg-brand-bg` (`#0a0a0a`)
- Texto: `text-white` / `text-gray-400`
- Acento: Orange (`text-brand-orange-400`, `bg-brand-orange-500`, `from-brand-orange-400 to-brand-orange-600`)
- Cards: `bg-white/5 backdrop-blur-sm border border-white/10`
- Card destaque: `border border-brand-orange-500/30`
- Navbar: `bg-black/60 backdrop-blur-md`

### Efeitos
- Glassmorphism: `backdrop-blur`
- Gradiente em títulos: `bg-gradient-to-r from-brand-orange-400 to-brand-orange-600 bg-clip-text text-transparent`
- Blobs decorativos: `rounded-full blur-3xl opacity-20 bg-brand-orange-500`
- Hover: `hover:shadow-lg hover:shadow-brand-orange-500/25`
- Acento suave (badges/pills): `bg-brand-orange-500/15 text-brand-orange-400 border border-brand-orange-500/30`

### Tipografia
- Fonte: DM Sans (sans-serif), DM Mono (monospace) — definidas no `@theme` do Tailwind
- Títulos: `text-4xl sm:text-5xl font-bold tracking-tight`
- Descrições: `text-lg text-gray-400`
- Mobile-first com `sm:`, `md:`, `lg:`
---

## Autenticação

### Store (Zustand)
- `useAuthStore`: `user`, `token`, `isAuthenticated`, `_hydrated`
- `setAuth()`, `logout()`, `setHydrated()`
- Persiste em localStorage chave `'auth-storage'`

### Guard (ProtectedLayout)
- `_hydrated === false` → spinner
- Não autenticado → redirect `/login` com state
- Autenticado → `<Outlet />`

### Axios interceptor
- Request: injeta `Authorization: Bearer <token>`
- Response: 401 (exceto `/auth/signin`) → logout + redirect

---

## Regras importantes

1. **NUNCA** chamar serviço direto na página — sempre query hook
2. **Sempre tratar** loading, error e empty states
3. **Sempre tipar** retorno dos services com `ApiResponse<T>`
4. **NUNCA** expor token/credenciais no código ou commits
5. **Manter consistência** visual do design system
6. **NUNCA** adicionar bibliotecas novas sem verificar se já existe equivalente
7. **Responsividade**: mobile-first com `sm:`, `md:`, `lg:`
8. **Performance**: `staleTime` adequado nas queries
9. **Import type**: `import type { Foo }` (verbatimModuleSyntax)
10. **ESLint**: single quotes, semicolons, 2 spaces
11. **shadcn/ui**: usar componentes de `@/components/ui/` sempre que possível; não criar componentes customizados quando o shadcn já prover equivalente
