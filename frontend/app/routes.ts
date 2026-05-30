import { type RouteConfig, index, route, layout } from '@react-router/dev/routes';

export default [
  // Public routes
  route('login', 'pages/login.tsx'),

  // Protected routes
  layout('components/layouts/protected-layout.tsx', [
    layout('components/layouts/dashboard-layout.tsx', [
      index('pages/dashboard/appointments/index.tsx'),
      route('beneficiarios', 'pages/dashboard/beneficiaries/index.tsx'),
      route('categorias', 'pages/dashboard/service-categories/index.tsx'),
      route('metricas', 'pages/dashboard/metrics/index.tsx'),
    ]),
    route('painel', 'pages/dashboard/panel/index.tsx'),
  ]),
] satisfies RouteConfig;
