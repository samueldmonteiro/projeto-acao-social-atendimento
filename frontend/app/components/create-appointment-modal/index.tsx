import { useState } from 'react';
import { toast } from 'sonner';
import { StarIcon, Plus } from 'lucide-react';
import { CreateModal } from '@/components/create-modal';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useCreateAppointment } from '@/hooks/queries/use-appointments';
import { useBeneficiaries } from '@/hooks/queries/use-beneficiaries';
import { useServiceCategories } from '@/hooks/queries/use-service-categories';
import { CreateBeneficiaryModal } from '@/pages/dashboard/beneficiaries/create-beneficiary-modal';
import { CreateServiceCategoryModal } from '@/pages/dashboard/service-categories/create-service-category-modal';
import type { CreateAppointment } from '@/types/appointments.type';

interface CreateAppointmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const INITIAL_FORM: CreateAppointment = {
  beneficiaryId: '',
  serviceCategoryId: '',
  priority: false,
};

export function CreateAppointmentModal({
  open,
  onOpenChange,
}: CreateAppointmentModalProps) {
  const [form, setForm] = useState<CreateAppointment>(INITIAL_FORM);
  const [isCreateBeneficiaryOpen, setIsCreateBeneficiaryOpen] = useState(false);
  const [isCreateServiceCategoryOpen, setIsCreateServiceCategoryOpen] = useState(false);

  const { data: beneficiariesData, isLoading: loadingBeneficiaries } = useBeneficiaries({
    perPage:400
  });
  const { data: categoriesData, isLoading: loadingCategories } = useServiceCategories();
  const createMutation = useCreateAppointment();

  const beneficiaries = beneficiariesData?.data?.items ?? [];
  const categories = categoriesData?.data ?? [];

  function handleClose(nextOpen: boolean) {
    if (!nextOpen) setForm(INITIAL_FORM);
    onOpenChange(nextOpen);
  }

  function handleSubmit() {
    if (!form.beneficiaryId || !form.serviceCategoryId) return;

    createMutation.mutate(form, {
      onSuccess() {
        toast.success('Atendimento criado com sucesso!');
        handleClose(false);
      },
      onError(err) {
        const message =
          err.response?.data?.message ?? 'Erro ao criar atendimento.';
        toast.error(String(message));
      },
    });
  }

  const isFormValid = !!form.beneficiaryId && !!form.serviceCategoryId;

  return (
    <>
      <CreateModal
        open={open}
        onOpenChange={handleClose}
        title="Novo Atendimento"
        description="Selecione o beneficiário, a categoria de serviço e a prioridade."
        onSubmit={handleSubmit}
        isSubmitting={createMutation.isPending}
        submitLabel="Criar Atendimento"
        submitDisabled={!isFormValid}
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="create-appointment-beneficiary"
              className="text-xs text-muted-foreground font-medium"
            >
              Beneficiário <span className="text-brand-orange-400">*</span>
            </Label>
            <div className="flex gap-2">
              <Select
                value={form.beneficiaryId}
                onValueChange={(v) => setForm((prev) => ({ ...prev, beneficiaryId: v ?? '' }))}
                disabled={loadingBeneficiaries}
              >
                <SelectTrigger
                  id="create-appointment-beneficiary"
                  className="h-9 bg-background border-input text-foreground text-sm data-placeholder:text-muted-foreground flex-1"
                >
                  <SelectValue placeholder={loadingBeneficiaries ? 'Carregando...' : 'Selecionar'}>
                    {form.beneficiaryId
                      ? beneficiaries.find((b) => b.id === form.beneficiaryId)?.fullName
                      : null}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="min-w-[320px]">
                  {beneficiaries.map((b) => (
                    <SelectItem key={b.id} value={b.id}>
                      <span className="font-medium">{b.fullName}</span>
                    </SelectItem>
                  ))}
                  {!loadingBeneficiaries && beneficiaries.length === 0 && (
                    <div className="px-3 py-2 text-sm text-muted-foreground">
                      Nenhum beneficiário encontrado.
                    </div>
                  )}
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-9 w-9 shrink-0 border-input bg-background hover:bg-muted text-muted-foreground hover:text-foreground"
                onClick={() => setIsCreateBeneficiaryOpen(true)}
                title="Cadastrar Novo Beneficiário"
              >
                <Plus className="size-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="create-appointment-category"
              className="text-xs text-muted-foreground font-medium"
            >
              Categoria <span className="text-brand-orange-400">*</span>
            </Label>
            <div className="flex gap-2">
              <Select
                value={form.serviceCategoryId}
                onValueChange={(v) => setForm((prev) => ({ ...prev, serviceCategoryId: v ?? '' }))}
                disabled={loadingCategories}
              >
                <SelectTrigger
                  id="create-appointment-category"
                  className="h-9 bg-background border-input text-foreground text-sm data-placeholder:text-muted-foreground flex-1"
                >
                  <SelectValue placeholder={loadingCategories ? 'Carregando...' : 'Selecionar'}>
                    {form.serviceCategoryId
                      ? categories.find((cat) => cat.id === form.serviceCategoryId)?.name
                      : null}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="min-w-[240px]">
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      <span className="font-mono text-xs text-brand-orange-400 mr-2">{cat.prefix}</span>
                      {cat.name}
                    </SelectItem>
                  ))}
                  {!loadingCategories && categories.length === 0 && (
                    <div className="px-3 py-2 text-sm text-muted-foreground">
                      Nenhuma categoria encontrada.
                    </div>
                  )}
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-9 w-9 shrink-0 border-input bg-background hover:bg-muted text-muted-foreground hover:text-foreground"
                onClick={() => setIsCreateServiceCategoryOpen(true)}
                title="Nova Categoria"
              >
                <Plus className="size-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-muted-foreground font-medium">
            Prioridade
          </Label>
          <div className="flex gap-2">
            <button
              type="button"
              id="priority-normal"
              onClick={() => setForm((prev) => ({ ...prev, priority: false }))}
              className={[
                'flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-sm transition-colors cursor-pointer',
                !form.priority
                  ? 'border-brand-orange-500/60 bg-brand-orange-500/10 text-brand-orange-400'
                  : 'border-border bg-background text-muted-foreground hover:bg-accent hover:text-foreground',
              ].join(' ')}
            >
              Normal
            </button>
            <button
              type="button"
              id="priority-high"
              onClick={() => setForm((prev) => ({ ...prev, priority: true }))}
              className={[
                'flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-sm transition-colors cursor-pointer',
                form.priority
                  ? 'border-brand-orange-500/60 bg-brand-orange-500/10 text-brand-orange-400'
                  : 'border-border bg-background text-muted-foreground hover:bg-accent hover:text-foreground',
              ].join(' ')}
            >
              <StarIcon className="size-3.5" />
              Prioritário
            </button>
          </div>
          {form.priority && (
            <Badge
              variant="outline"
              className="self-start bg-brand-orange-500/15 text-brand-orange-400 border-brand-orange-500/30 text-xs"
            >
              Este atendimento será marcado como prioritário
            </Badge>
          )}
        </div>
      </CreateModal>

      <CreateBeneficiaryModal
        open={isCreateBeneficiaryOpen}
        onOpenChange={setIsCreateBeneficiaryOpen}
      />

      <CreateServiceCategoryModal
        open={isCreateServiceCategoryOpen}
        onOpenChange={setIsCreateServiceCategoryOpen}
      />
    </>
  );
}
