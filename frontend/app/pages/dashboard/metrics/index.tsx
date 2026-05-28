import { useDashboardSummary } from '@/hooks/queries/use-dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import {
  UsersIcon,
  CalendarCheckIcon,
  TagIcon,
  PieChartIcon,
  TrendingUpIcon,
  ActivityIcon,
  Users2Icon
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid
} from 'recharts';

export function meta() {
  return [
    { title: 'Métricas e Indicadores - Ação Social' },
    { name: 'description', content: 'Análise de métricas, distribuição e relatórios de atendimento.' },
  ];
}

export default function MetricsPage() {
  const { data: summaryData, isLoading, isError, refetch } = useDashboardSummary();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 p-4 md:p-6 animate-pulse">
        {/* Header Skeleton */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-5 w-96" />
        </div>

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="bg-card border border-border">
              <CardHeader className="gap-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-3 w-36" />
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Charts Grid Skeleton */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="bg-card border border-border">
            <CardHeader>
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-72" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-72 w-full" />
            </CardContent>
          </Card>
          <Card className="bg-card border border-border">
            <CardHeader>
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-72" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-72 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 p-4 text-center">
        <div className="p-4 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20">
          <ActivityIcon className="size-10" />
        </div>
        <h2 className="text-xl font-bold">Erro ao carregar métricas</h2>
        <p className="text-muted-foreground max-w-md">
          Não foi possível conectar ao servidor para carregar os indicadores em tempo real. Por favor, tente novamente.
        </p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 text-sm font-medium text-white bg-brand-orange-500 rounded-md hover:bg-brand-orange-600 transition-colors"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  const summary = summaryData?.data;
  const overview = summary?.overview;
  const categoriesRanking = summary?.categoriesRanking ?? [];
  const genderDistribution = summary?.genderDistribution ?? [];

  // Data processing for charts
  const genderChartData = genderDistribution.map(item => ({
    name: item.label || item.gender,
    value: item.count,
    percentage: item.percentage
  }));

  const rankingChartData = categoriesRanking.map(item => ({
    name: item.name,
    beneficiarios: item.totalBeneficiaries,
    porcentagem: item.percentage
  }));

  // Colors for gender distribution
  const COLORS = ['#f97316', '#3b82f6', '#10b981', '#a855f7', '#64748b'];

  // Completion Rate KPI
  const totalAppointments = overview?.totalAppointments ?? 0;
  const completedAppointments = overview?.totalAttended ?? 0;
  const completionRate = totalAppointments > 0 
    ? Math.round((completedAppointments / totalAppointments) * 100) 
    : 0;

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      {/* Decorative Blur Blobs */}
      <div className="absolute top-0 right-0 -z-10 w-72 h-72 rounded-full blur-3xl opacity-10 bg-brand-orange-500 pointer-events-none" />
      <div className="absolute bottom-10 left-10 -z-10 w-96 h-96 rounded-full blur-3xl opacity-5 bg-brand-orange-500 pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-brand-orange-400 to-brand-orange-600 bg-clip-text text-transparent sm:text-4xl">
          Métricas & Indicadores
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Visão geral consolidada dos atendimentos, público assistido e categorias de serviço para gestão estratégica.
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Beneficiários */}
        <Card className="bg-card dark:bg-white/5 backdrop-blur-sm border border-border dark:border-white/10 hover:border-brand-orange-500/30 transition-all duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardDescription className="text-sm font-medium text-muted-foreground">
              Total de Beneficiários
            </CardDescription>
            <div className="p-2 rounded-lg bg-brand-orange-500/10 text-brand-orange-400 border border-brand-orange-500/20 group-hover:scale-110 transition-transform">
              <UsersIcon className="size-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight text-foreground dark:text-white">
              {overview?.totalBeneficiaries ?? 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Pessoas cadastradas e acompanhadas
            </p>
          </CardContent>
        </Card>

        {/* Total Atendimentos */}
        <Card className="bg-card dark:bg-white/5 backdrop-blur-sm border border-border dark:border-white/10 hover:border-brand-orange-500/30 transition-all duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardDescription className="text-sm font-medium text-muted-foreground">
              Total de Atendimentos
            </CardDescription>
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:scale-110 transition-transform">
              <CalendarCheckIcon className="size-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight text-foreground dark:text-white">
              {overview?.totalAppointments ?? 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Atendimentos totais agendados
            </p>
          </CardContent>
        </Card>

        {/* Completion Rate */}
        <Card className="bg-card dark:bg-white/5 backdrop-blur-sm border border-border dark:border-white/10 hover:border-brand-orange-500/30 transition-all duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardDescription className="text-sm font-medium text-muted-foreground">
              Taxa de Conclusão
            </CardDescription>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform">
              <TrendingUpIcon className="size-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight text-foreground dark:text-white">
              {completionRate}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {overview?.totalAttended ?? 0} atendimentos realizados
            </p>
          </CardContent>
        </Card>

        {/* Categoria Mais Procurada */}
        <Card className="bg-card dark:bg-white/5 backdrop-blur-sm border border-border dark:border-white/10 hover:border-brand-orange-500/30 transition-all duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardDescription className="text-sm font-medium text-muted-foreground">
              Categoria Principal
            </CardDescription>
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 group-hover:scale-110 transition-transform">
              <TagIcon className="size-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold tracking-tight text-foreground dark:text-white truncate">
              {summary?.topCategory?.name ?? 'Nenhuma'}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {summary?.topCategory?.totalBeneficiaries ?? 0} beneficiários associados
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Service Categories Ranking */}
        <Card className="bg-card dark:bg-white/5 backdrop-blur-sm border border-border dark:border-white/10">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground dark:text-white flex items-center gap-2">
              <ActivityIcon className="size-5 text-brand-orange-400" />
              Ranking de Categorias de Serviço
            </CardTitle>
            <CardDescription>
              Demanda por tipo de atendimento e assistência
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[340px]">
            {rankingChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={rankingChartData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.4} horizontal={true} vertical={false} />
                  <XAxis type="number" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    dataKey="name"
                    type="category"
                    stroke="var(--muted-foreground)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    width={100}
                  />
                  <RechartsTooltip
                    cursor={{ fill: 'var(--muted)', opacity: 0.15 }}
                    contentStyle={{
                      backgroundColor: 'var(--popover)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--popover-foreground)',
                    }}
                  />
                  <Bar
                    dataKey="beneficiarios"
                    fill="#f97316"
                    radius={[0, 4, 4, 0]}
                    name="Beneficiários"
                    barSize={18}
                  >
                    {rankingChartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#ea580c' : '#f97316'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Nenhum dado disponível
              </div>
            )}
          </CardContent>
        </Card>

        {/* Gender Distribution */}
        <Card className="bg-card dark:bg-white/5 backdrop-blur-sm border border-border dark:border-white/10">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground dark:text-white flex items-center gap-2">
              <PieChartIcon className="size-5 text-brand-orange-400" />
              Distribuição de Gênero
            </CardTitle>
            <CardDescription>
              Perfil demográfico do público atendido
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[340px] flex flex-col sm:flex-row items-center justify-center gap-6">
            {genderChartData.length > 0 ? (
              <>
                <div className="w-full sm:w-1/2 h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={genderChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={85}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {genderChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip
                        contentStyle={{
                          backgroundColor: 'var(--popover)',
                          border: '1px solid var(--border)',
                          borderRadius: 'var(--radius-md)',
                          color: 'var(--popover-foreground)',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col gap-3 w-full sm:w-1/2">
                  {genderChartData.map((item, index) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="size-3 rounded-full shrink-0"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-sm font-medium text-foreground/80 dark:text-gray-300">{item.name}</span>
                      </div>
                      <div className="text-sm font-mono text-muted-foreground dark:text-gray-400">
                        {item.value} <span className="text-xs text-muted-foreground/60 dark:text-gray-500">({item.percentage}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Nenhum dado disponível
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Additional Management View Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* General Details & Highlights */}
        <Card className="bg-card dark:bg-white/5 backdrop-blur-sm border border-border dark:border-white/10 lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground dark:text-white">
              Status dos Atendimentos
            </CardTitle>
            <CardDescription>
              Detalhamento das fases de assistência
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center justify-between p-2 rounded-lg bg-muted/40 dark:bg-white/5 border border-border/50 dark:border-white/5">
              <span className="text-sm text-foreground/80 dark:text-gray-300">Concluídos</span>
              <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-mono">
                {overview?.totalAttended ?? 0}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-muted/40 dark:bg-white/5 border border-border/50 dark:border-white/5">
              <span className="text-sm text-foreground/80 dark:text-gray-300">Em Fila / Aguardando</span>
              <Badge className="bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 font-mono">
                {overview?.waiting ?? 0}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-muted/40 dark:bg-white/5 border border-border/50 dark:border-white/5">
              <span className="text-sm text-foreground/80 dark:text-gray-300">Em Atendimento</span>
              <Badge className="bg-sky-500/15 text-sky-600 dark:text-sky-400 border border-sky-500/30 font-mono">
                {overview?.toBeAttended ?? 0}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-muted/40 dark:bg-white/5 border border-border/50 dark:border-white/5">
              <span className="text-sm text-foreground/80 dark:text-gray-300">Cancelados</span>
              <Badge className="bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 font-mono">
                {overview?.canceled ?? 0}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Recent Beneficiaries Overview */}
        <Card className="bg-card dark:bg-white/5 backdrop-blur-sm border border-border dark:border-white/10 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground dark:text-white flex items-center gap-2">
              <Users2Icon className="size-5 text-brand-orange-400" />
              Novos Beneficiários Cadastrados
            </CardTitle>
            <CardDescription>
              Últimos registros adicionados ao sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            {summary?.recentBeneficiaries && summary.recentBeneficiaries.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b border-border dark:border-white/10 text-muted-foreground dark:text-gray-400 font-medium">
                      <th className="py-2 px-3">Nome</th>
                      <th className="py-2 px-3">Gênero</th>
                      <th className="py-2 px-3">Data de Cadastro</th>
                      <th className="py-2 px-3">Serviços / Categorias</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border dark:divide-white/5">
                    {summary.recentBeneficiaries.map((b) => (
                      <tr key={b.id} className="text-foreground/90 dark:text-gray-300 hover:bg-muted/50 dark:hover:bg-white/5 transition-colors">
                        <td className="py-2.5 px-3 font-medium text-foreground dark:text-white">{b.fullName}</td>
                        <td className="py-2.5 px-3 text-xs capitalize">{b.gender.toLowerCase()}</td>
                        <td className="py-2.5 px-3 text-xs text-muted-foreground dark:text-gray-400">
                          {new Date(b.createdAt).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="py-2.5 px-3">
                          <div className="flex flex-wrap gap-1">
                            {b.appointments && b.appointments.length > 0 ? (
                              b.appointments.slice(0, 2).map((apt) => (
                                <Badge key={apt.id} variant="secondary" className="text-[10px] bg-muted dark:bg-white/10 text-foreground dark:text-white border-0">
                                  {apt.name}
                                </Badge>
                              ))
                            ) : (
                              <span className="text-xs text-muted-foreground dark:text-gray-500">Sem agendamentos</span>
                            )}
                            {b.appointments && b.appointments.length > 2 && (
                              <span className="text-xs text-muted-foreground dark:text-gray-500">+{b.appointments.length - 2}</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex items-center justify-center py-6 text-muted-foreground">
                Nenhum beneficiário recente registrado.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
