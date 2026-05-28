import { useState } from 'react';
import { toast } from 'sonner';
import { StarIcon } from 'lucide-react';
import { CreateModal } from '@/components/create-modal';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUpdateAppointment } from '@/hooks/queries/use-appointments';
import type { AppointmentListWithRelations } from '@/types/appointments.type';

interface UpdateAppointmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointment: AppointmentListWithRelations | null;
}

function formatToDatetimeLocal(dateStr?: string | null): string {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return '';
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  } catch {
    return '';
  }
}

export function UpdateAppointmentModal({
  open,
  onOpenChange,
  appointment,
}: UpdateAppointmentModalProps) {
  const [formPriority, setFormPriority] = useState(appointment?.priority ?? false);
  const [formCanceled, setFormCanceled] = useState(appointment?.canceled ?? false);
  const [formCallCode, setFormCallCode] = useState(appointment?.callCode ?? '');
  const [formStartedAt, setFormStartedAt] = useState(formatToDatetimeLocal(appointment?.startedAt));
  const [formFinishedAt, setFormFinishedAt] = useState(formatToDatetimeLocal(appointment?.finishedAt));

  const updateMutation = useUpdateAppointment();

  function handleClose(nextOpen: boolean) {
    onOpenChange(nextOpen);
  }

  function handleUpdateAppointment() {
    if (!appointment) return;

    if (!formCallCode.trim()) {
      toast.error('O código de chamada (senha) é obrigatório.');
      return;
    }

    const startedAtIso = formStartedAt ? new Date(formStartedAt).toISOString() : null;
    const finishedAtIso = formFinishedAt ? new Date(formFinishedAt).toISOString() : null;

    updateMutation.mutate(
      {
        beneficiaryId: appointment.beneficiaryId,
        serviceCategoryId: appointment.serviceCategoryId,
        data: {
          priority: formPriority,
          canceled: formCanceled,
          callCode: formCallCode,
          startedAt: startedAtIso,
          finishedAt: finishedAtIso,
        },
      },
      {
        onSuccess: () => {
          toast.success('Atendimento atualizado com sucesso!');
          handleClose(false);
        },
        onError: (err) => {
          toast.error(err?.response?.data?.message || 'Erro ao atualizar atendimento.');
        },
      }
    );
  }

  const isFormValid = !!formCallCode.trim();

  return (
    <CreateModal
      open={open}
      onOpenChange={handleClose}
      title="Editar Atendimento"
      description="Altere os dados desejados do atendimento."
      onSubmit={handleUpdateAppointment}
      isSubmitting={updateMutation.isPending}
      submitLabel="Salvar"
      submitDisabled={!isFormValid}
    >
      {appointment && (
        <div className="flex flex-col gap-4">
          {/* Informações não editáveis (Chaves) */}
          <div className="grid grid-cols-1 gap-2 rounded-lg bg-white/5 border border-white/10 p-3 text-xs">
            <div>
              <span className="text-muted-foreground font-medium block">Beneficiário:</span>
              <span className="text-foreground font-semibold">{appointment.beneficiary.fullName} ({appointment.beneficiary.cpf})</span>
            </div>
            <div>
              <span className="text-muted-foreground font-medium block">Categoria de Serviço:</span>
              <span className="text-foreground font-semibold">{appointment.serviceCategory.prefix} — {appointment.serviceCategory.name}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Código de Chamada */}
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <Label htmlFor="edit-call-code" className="text-xs text-muted-foreground font-medium">
                Código de Chamada (Senha) *
              </Label>
              <Input
                id="edit-call-code"
                placeholder="Ex: SEG001"
                value={formCallCode}
                onChange={(e) => setFormCallCode(e.target.value)}
                className="bg-background border-input text-foreground text-sm"
                disabled={updateMutation.isPending}
              />
            </div>

            {/* Início */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="edit-started-at" className="text-xs text-muted-foreground font-medium">
                Data/Hora de Início
              </Label>
              <Input
                id="edit-started-at"
                type="datetime-local"
                value={formStartedAt}
                onChange={(e) => setFormStartedAt(e.target.value)}
                className="bg-background border-input text-foreground text-sm"
                disabled={updateMutation.isPending}
              />
            </div>

            {/* Fim */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="edit-finished-at" className="text-xs text-muted-foreground font-medium">
                Data/Hora de Término
              </Label>
              <Input
                id="edit-finished-at"
                type="datetime-local"
                value={formFinishedAt}
                onChange={(e) => setFormFinishedAt(e.target.value)}
                className="bg-background border-input text-foreground text-sm"
                disabled={updateMutation.isPending}
              />
            </div>

            {/* Cancelado */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="edit-canceled" className="text-xs text-muted-foreground font-medium">
                Cancelado *
              </Label>
              <Select
                value={formCanceled ? 'true' : 'false'}
                onValueChange={(v) => setFormCanceled(v === 'true')}
                disabled={updateMutation.isPending}
              >
                <SelectTrigger
                  id="edit-canceled"
                  className="bg-background border-input text-foreground text-sm"
                >
                  <SelectValue placeholder="Selecionar">
                    {formCanceled ? 'Sim' : 'Não'}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-card border border-border">
                  <SelectItem value="false">Não</SelectItem>
                  <SelectItem value="true">Sim</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Prioridade */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-muted-foreground font-medium">
                Prioridade
              </Label>
              <div className="flex gap-2">
                <button
                  type="button"
                  id="edit-priority-normal"
                  onClick={() => setFormPriority(false)}
                  className={[
                    'flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-sm transition-colors cursor-pointer',
                    !formPriority
                      ? 'border-brand-orange-500/60 bg-brand-orange-500/10 text-brand-orange-400'
                      : 'border-border bg-background text-muted-foreground hover:bg-accent hover:text-foreground',
                  ].join(' ')}
                  disabled={updateMutation.isPending}
                >
                  Normal
                </button>
                <button
                  type="button"
                  id="edit-priority-high"
                  onClick={() => setFormPriority(true)}
                  className={[
                    'flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-sm transition-colors cursor-pointer',
                    formPriority
                      ? 'border-brand-orange-500/60 bg-brand-orange-500/10 text-brand-orange-400'
                      : 'border-border bg-background text-muted-foreground hover:bg-accent hover:text-foreground',
                  ].join(' ')}
                  disabled={updateMutation.isPending}
                >
                  <StarIcon className="size-3.5" />
                  Prioritário
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </CreateModal>
  );
}
