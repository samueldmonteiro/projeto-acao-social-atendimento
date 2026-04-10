import { type RouteConfig, index, route, layout } from '@react-router/dev/routes';

export default [
  layout('layouts/main-layout.tsx', [
    index('pages/home.tsx'),
    route('usuarios', 'pages/users/index.tsx'),
  ]),
] satisfies RouteConfig;

