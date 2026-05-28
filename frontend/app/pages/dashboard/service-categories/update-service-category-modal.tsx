import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { CreateModal } from '@/components/create-modal';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useUpdateServiceCategory } from '@/hooks/queries/use-service-categories';
import type { ServiceCategory } from '@/types/service-category.type';

interface UpdateServiceCategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: ServiceCategory | null;
}

export function UpdateServiceCategoryModal({
  open,
  onOpenChange,
  category,
}: UpdateServiceCategoryModalProps) {
  const [formName, setFormName] = useState('');
  const [formPrefix, setFormPrefix] = useState('');

  useEffect(() => {
    if (category) {
      setFormName(category.name);
      setFormPrefix(category.prefix);
    }
  }, [category, open]);

  const updateMutation = useUpdateServiceCategory();

  function handleClose(nextOpen: boolean) {
    onOpenChange(nextOpen);
  }

  function handleUpdate() {
    if (!category) return;

    if (!formName.trim() || !formPrefix.trim()) {
      toast.error('Preencha os campos obrigatórios (Nome e Prefixo).');
      return;
    }

    updateMutation.mutate(
      {
        id: category.id,
        data: {
          name: formName.trim(),
          prefix: formPrefix.trim().toUpperCase(),
        },
      },
      {
        onSuccess: () => {
          toast.success('Categoria atualizada com sucesso!');
          handleClose(false);
        },
        onError: (err) => {
          toast.error(err?.response?.data?.message || 'Erro ao atualizar categoria.');
        },
      }
    );
  }

  const isFormValid = !!formName.trim() && !!formPrefix.trim();

  return (
    <CreateModal
      open={open}
      onOpenChange={handleClose}
      title="Editar Categoria de Serviço"
      description="Altere os dados da categoria."
      onSubmit={handleUpdate}
      isSubmitting={updateMutation.isPending}
      submitLabel="Salvar"
      submitDisabled={!isFormValid}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="edit-cat-name" className="text-xs text-muted-foreground font-medium">
            Nome *
          </Label>
          <Input
            id="edit-cat-name"
            placeholder="Ex: Assistência Social"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            className="bg-background border-input text-foreground text-sm"
            disabled={updateMutation.isPending}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="edit-cat-prefix" className="text-xs text-muted-foreground font-medium">
            Prefixo *
          </Label>
          <Input
            id="edit-cat-prefix"
            placeholder="Ex: AS"
            value={formPrefix}
            onChange={(e) => setFormPrefix(e.target.value.toUpperCase())}
            className="bg-background border-input text-foreground text-sm font-mono"
            disabled={updateMutation.isPending}
            maxLength={10}
          />
          <p className="text-xs text-muted-foreground">
            O prefixo será usado para gerar os códigos de atendimento (ex:{' '}
            <span className="font-mono text-brand-orange-400">{formPrefix || 'AS'}001</span>).
          </p>
        </div>
      </div>
    </CreateModal>
  );
}
