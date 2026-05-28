import { Badge } from '@/components/ui/badge';
import { ViewDetailSheet, DetailSection, DetailRow } from '@/components/view-detail-sheet';
import { AppointmentStatusBadge } from '@/components/appointments-table/appointment-status-badge';
import type { AppointmentListWithRelations } from '@/types/appointments.type';

interface AppointmentDetailSheetProps {
  appointment: AppointmentListWithRelations | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return '—';
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateStr));
}

function formatDateOnly(dateStr: string | null | undefined): string {
  if (!dateStr) return '—';
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(dateStr));
}

const genderLabel: Record<string, string> = {
  MALE: 'Masculino',
  FEMALE: 'Feminino',
};

export function AppointmentDetailSheet({
  appointment,
  open,
  onOpenChange,
}: AppointmentDetailSheetProps) {
  if (!appointment) return null;

  return (
    <ViewDetailSheet
      open={open}
      onOpenChange={onOpenChange}
      title={`Atendimento — Senha ${appointment.callCode}`}
      description={`Criado em ${formatDate(appointment.createdAt)}`}
    >
      <DetailSection title="Atendimento">
        <DetailRow label="Senha" value={
          <span className="font-mono text-brand-orange-400 font-bold text-base">
            {appointment.callCode}
          </span>
        } />
        <DetailRow label="Status" value={<AppointmentStatusBadge appointment={appointment} />} />
        <DetailRow label="Prioridade" value={
          appointment.priority ? (
            <Badge variant="outline" className="bg-brand-orange-500/15 text-brand-orange-400 border-brand-orange-500/30 text-xs">
              Prioritário
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-white/5 text-gray-400 border-white/10 text-xs">
              Normal
            </Badge>
          )
        } />
        <DetailRow label="Cancelado" value={
          appointment.canceled ? (
            <span className="text-rose-400">Sim</span>
          ) : (
            <span className="text-gray-400">Não</span>
          )
        } />
        <DetailRow label="Início" value={appointment.startedAt ? formatDate(appointment.startedAt) : null} />
        <DetailRow label="Finalizado" value={appointment.finishedAt ? formatDate(appointment.finishedAt) : null} />
        <DetailRow label="Criado em" value={formatDate(appointment.createdAt)} />
      </DetailSection>

      <DetailSection title="Beneficiário">
        <DetailRow label="Nome" value={appointment.beneficiary.fullName} />
        <DetailRow label="CPF" value={appointment.beneficiary.cpf} />
        <DetailRow label="Gênero" value={genderLabel[appointment.beneficiary.gender] ?? appointment.beneficiary.gender} />
        <DetailRow label="Nascimento" value={formatDateOnly(appointment.beneficiary.birthDate)} />
        {appointment.beneficiary.phone && (
          <DetailRow label="Telefone" value={appointment.beneficiary.phone} />
        )}
        {appointment.beneficiary.email && (
          <DetailRow label="E-mail" value={appointment.beneficiary.email} />
        )}
        {appointment.beneficiary.address && (
          <DetailRow label="Endereço" value={appointment.beneficiary.address} />
        )}
      </DetailSection>

      <DetailSection title="Categoria de Serviço">
        <DetailRow label="Nome" value={appointment.serviceCategory.name} />
        <DetailRow label="Prefixo" value={
          <span className="font-mono text-brand-orange-400">
            {appointment.serviceCategory.prefix}
          </span>
        } />
        <DetailRow label="Cadastrado em" value={formatDate(appointment.serviceCategory.createdAt)} />
      </DetailSection>
    </ViewDetailSheet>
  );
}
