import { useState } from 'react';
import { toast } from 'sonner';
import { CreateModal } from '@/components/create-modal';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useCreateServiceCategory } from '@/hooks/queries/use-service-categories';

interface CreateServiceCategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateServiceCategoryModal({
  open,
  onOpenChange,
}: CreateServiceCategoryModalProps) {
  const [formName, setFormName] = useState('');
  const [formPrefix, setFormPrefix] = useState('');

  const createMutation = useCreateServiceCategory();

  function handleClose(nextOpen: boolean) {
    if (!nextOpen) {
      setFormName('');
      setFormPrefix('');
    }
    onOpenChange(nextOpen);
  }

  function handleCreate() {
    if (!formName.trim() || !formPrefix.trim()) {
      toast.error('Preencha os campos obrigatórios (Nome e Prefixo).');
      return;
    }

    createMutation.mutate(
      {
        name: formName.trim(),
        prefix: formPrefix.trim().toUpperCase(),
      },
      {
        onSuccess: () => {
          toast.success('Categoria criada com sucesso!');
          handleClose(false);
        },
        onError: (err) => {
          toast.error(err?.response?.data?.message || 'Erro ao criar categoria.');
        },
      }
    );
  }

  const isFormValid = !!formName.trim() && !!formPrefix.trim();

  return (
    <CreateModal
      open={open}
      onOpenChange={handleClose}
      title="Nova Categoria de Serviço"
      description="Preencha os dados da nova categoria. Nome e Prefixo são obrigatórios."
      onSubmit={handleCreate}
      isSubmitting={createMutation.isPending}
      submitLabel="Criar Categoria"
      submitDisabled={!isFormValid}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="create-cat-name" className="text-xs text-muted-foreground font-medium">
            Nome *
          </Label>
          <Input
            id="create-cat-name"
            placeholder="Ex: Assistência Social"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            className="bg-background border-input text-foreground text-sm"
            disabled={createMutation.isPending}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="create-cat-prefix" className="text-xs text-muted-foreground font-medium">
            Prefixo *
          </Label>
          <Input
            id="create-cat-prefix"
            placeholder="Ex: AS"
            value={formPrefix}
            onChange={(e) => setFormPrefix(e.target.value.toUpperCase())}
            className="bg-background border-input text-foreground text-sm font-mono"
            disabled={createMutation.isPending}
            maxLength={10}
          />
          <p className="text-xs text-muted-foreground">
            O prefixo será usado para gerar os códigos de atendimento (ex: <span className="font-mono text-brand-orange-400">{formPrefix || 'AS'}001</span>).
          </p>
        </div>
      </div>
    </CreateModal>
  );
}
