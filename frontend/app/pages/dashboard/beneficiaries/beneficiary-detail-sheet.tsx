import { ViewDetailSheet, DetailSection, DetailRow } from '@/components/view-detail-sheet';
import { AppointmentStatusBadge } from '@/components/appointments-table/appointment-status-badge';
import type { BeneficiaryWithAppointments } from '@/types/beneficiary.type';

interface BeneficiaryDetailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  beneficiary: BeneficiaryWithAppointments | null;
}

function formatDate(dateStr: string | null | undefined, includeTime = false): string {
  if (!dateStr) return '—';
  try {
    const date = new Date(dateStr);
    const isDateOnly = dateStr.length === 10 || !dateStr.includes('T');
    const adjustedDate = isDateOnly ? new Date(date.getTime() + date.getTimezoneOffset() * 60000) : date;
    
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      ...(includeTime
        ? {
          hour: '2-digit',
          minute: '2-digit',
        }
        : {}),
    }).format(adjustedDate);
  } catch {
    return '—';
  }
}

function formatCpf(cpf: string): string {
  if (!cpf) return '—';
  const clean = cpf.replace(/\D/g, '');
  if (clean.length !== 11) return cpf;
  return `${clean.slice(0, 3)}.${clean.slice(3, 6)}.${clean.slice(6, 9)}-${clean.slice(9)}`;
}

function formatPhone(phone: string | null | undefined): string {
  if (!phone) return '—';
  const clean = phone.replace(/\D/g, '');
  if (clean.length === 11) {
    return `(${clean.slice(0, 2)}) ${clean.slice(2, 7)}-${clean.slice(7)}`;
  }
  if (clean.length === 10) {
    return `(${clean.slice(0, 2)}) ${clean.slice(2, 6)}-${clean.slice(6)}`;
  }
  return phone;
}

export function BeneficiaryDetailSheet({
  open,
  onOpenChange,
  beneficiary,
}: BeneficiaryDetailSheetProps) {
  return (
    <ViewDetailSheet
      open={open}
      onOpenChange={onOpenChange}
      title="Detalhes do Beneficiário"
      description="Ficha cadastral completa e histórico de atendimentos."
    >
      {beneficiary && (
        <div className="flex flex-col gap-6">
          <DetailSection title="Informações Pessoais">
            <DetailRow label="Nome Completo" value={beneficiary.fullName} />
            <DetailRow label="CPF" value={formatCpf(beneficiary.cpf)} />
            <DetailRow label="Data de Nascimento" value={formatDate(beneficiary.birthDate)} />
            <DetailRow
              label="Gênero"
              value={beneficiary.gender === 'MALE' ? 'Masculino' : 'Feminino'}
            />
          </DetailSection>

          <DetailSection title="Contato e Endereço">
            <DetailRow label="Telefone" value={formatPhone(beneficiary.phone)} />
            <DetailRow label="E-mail" value={beneficiary.email} />
            <DetailRow label="Endereço" value={beneficiary.address} />
          </DetailSection>

          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-brand-orange-400">
              Histórico de Atendimentos ({beneficiary.appointments?.length ?? 0})
            </h3>
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              {beneficiary.appointments && beneficiary.appointments.length > 0 ? (
                <div className="divide-y divide-border">
                  {beneficiary.appointments.map((apt) => (
                    <div key={apt.createdAt} className="p-4 flex flex-col gap-2 hover:bg-muted/20 transition-colors">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-brand-orange-400">
                            {apt.callCode || '—'}
                          </span>
                          <span className="text-xs font-medium text-foreground">
                            {apt.serviceCategory?.name || 'Categoria Removida'}
                          </span>
                        </div>
                        <AppointmentStatusBadge appointment={apt} />
                      </div>
                      <div className="flex justify-between items-center text-[10px] text-muted-foreground">
                        <span>Criado em: {formatDate(apt.createdAt, true)}</span>
                        {apt.priority && (
                          <span className="text-brand-orange-400 font-semibold uppercase tracking-wide">
                            Prioritário
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-xs text-muted-foreground italic">
                  Nenhum histórico de atendimento registrado.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </ViewDetailSheet>
  );
}
