'use client';

import { useDashboardSummary } from '@/hooks/queries/use-dashboard';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  CalendarIcon,
  CheckCircle2Icon,
  PlayCircleIcon,
  ClockIcon,
  XCircleIcon,
} from 'lucide-react';

export function SectionCards() {
  const { data: summaryData, isLoading } = useDashboardSummary();
  const overview = summaryData?.data?.overview;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:px-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="bg-card border border-border">
            <CardHeader className="gap-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-8 w-16" />
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: 'Total de Atendimentos',
      value: overview?.totalAppointments ?? 0,
      description: 'Todos os agendamentos',
      icon: CalendarIcon,
      colorClass: 'border-l-4 border-l-brand-orange-500 bg-card border border-border text-card-foreground',
      badgeColor: 'bg-brand-orange-500/15 text-brand-orange-400 border border-brand-orange-500/30',
    },
    {
      title: 'Atendimentos Finalizados',
      value: overview?.totalAttended ?? 0,
      description: 'Concluídos com sucesso',
      icon: CheckCircle2Icon,
      colorClass: 'border-l-4 border-l-emerald-500 bg-card border border-border text-card-foreground',
      badgeColor: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    },
    {
      title: 'Em Atendimento',
      value: overview?.toBeAttended ?? 0,
      description: 'Em andamento',
      icon: PlayCircleIcon,
      colorClass: 'border-l-4 border-l-sky-500 bg-card border border-border text-card-foreground',
      badgeColor: 'bg-sky-500/15 text-sky-400 border border-sky-500/30',
    },
    {
      title: 'Em Espera',
      value: overview?.waiting ?? 0,
      description: 'Fila de espera',
      icon: ClockIcon,
      colorClass: 'border-l-4 border-l-amber-500 bg-card border border-border text-card-foreground',
      badgeColor: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
    },
    {
      title: 'Cancelados',
      value: overview?.canceled ?? 0,
      description: 'Cancelados',
      icon: XCircleIcon,
      colorClass: 'border-l-4 border-l-rose-500 bg-card border border-border text-card-foreground',
      badgeColor: 'bg-rose-500/15 text-rose-400 border border-rose-500/30',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:px-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card key={index} className={card.colorClass}>
            <CardHeader>
              <CardDescription className="text-muted-foreground">{card.title}</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums">
                {card.value}
              </CardTitle>
              <CardAction>
                <Badge className={card.badgeColor} variant="outline">
                  <Icon className="size-4" />
                </Badge>
              </CardAction>
            </CardHeader>
          </Card>
        );
      })}
    </div>
  );
}
