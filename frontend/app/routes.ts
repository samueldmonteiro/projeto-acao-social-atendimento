import { type RouteConfig, index, route, layout } from '@react-router/dev/routes';

export default [
  // Public routes
  route('login', 'pages/login.tsx'),

  // Protected routes
  layout('components/layouts/protected-layout.tsx', [
    layout('components/layouts/main-layout.tsx', [
      index('pages/home.tsx'),
      route('usuarios', 'pages/users/index.tsx'),
    ]),
  ]),
] satisfies RouteConfig;
