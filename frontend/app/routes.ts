import { type RouteConfig, index, route, layout } from '@react-router/dev/routes';

export default [
  // Public routes
  route('login', 'pages/login.tsx'),

  // Protected routes
  layout('components/layouts/protected-layout.tsx', [
    layout('components/layouts/dashboard-layout.tsx', [
      index('pages/dashboard/index.tsx'),
    ]),
  ]),
] satisfies RouteConfig;
