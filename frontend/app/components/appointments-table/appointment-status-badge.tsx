import { Badge } from '@/components/ui/badge';
import { ClockIcon, PlayCircleIcon, CheckCircle2Icon, XCircleIcon } from 'lucide-react';
import type { Appointment } from '@/types/appointments.type';

type AppointmentStatus = 'waiting' | 'in-progress' | 'finished' | 'canceled';

export function getAppointmentStatus(appointment: Appointment): AppointmentStatus {
  if (appointment.canceled) return 'canceled';
  if (appointment.finishedAt) return 'finished';
  if (appointment.startedAt) return 'in-progress';
  return 'waiting';
}

const statusConfig: Record<
  AppointmentStatus,
  { label: string; icon: typeof ClockIcon; className: string }
> = {
  waiting: {
    label: 'Em Espera',
    icon: ClockIcon,
    className: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
  },
  'in-progress': {
    label: 'Em Atendimento',
    icon: PlayCircleIcon,
    className: 'bg-sky-500/15 text-sky-400 border border-sky-500/30',
  },
  finished: {
    label: 'Finalizado',
    icon: CheckCircle2Icon,
    className: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
  },
  canceled: {
    label: 'Cancelado',
    icon: XCircleIcon,
    className: 'bg-rose-500/15 text-rose-400 border border-rose-500/30',
  },
};

interface AppointmentStatusBadgeProps {
  appointment: Appointment;
}

export function AppointmentStatusBadge({ appointment }: AppointmentStatusBadgeProps) {
  const status = getAppointmentStatus(appointment);
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge
      variant="outline"
      className={`gap-1.5 px-2 py-0.5 text-xs font-medium ${config.className}`}
    >
      <Icon className="size-3 shrink-0" />
      {config.label}
    </Badge>
  );
}
