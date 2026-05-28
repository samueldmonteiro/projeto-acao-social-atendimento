import { useState } from 'react';
import { toast } from 'sonner';
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
import { useUpdateBeneficiary } from '@/hooks/queries/use-beneficiaries';
import type { Beneficiary, Gender } from '@/types/beneficiary.type';

interface UpdateBeneficiaryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  beneficiary: Beneficiary | null;
}

export function UpdateBeneficiaryModal({
  open,
  onOpenChange,
  beneficiary,
}: UpdateBeneficiaryModalProps) {
  const [formName, setFormName] = useState(beneficiary?.fullName || '');
  const [formCpf, setFormCpf] = useState(beneficiary?.cpf || '');
  const [formEmail, setFormEmail] = useState(beneficiary?.email || '');
  const [formPhone, setFormPhone] = useState(beneficiary?.phone || '');
  const [formBirthDate, setFormBirthDate] = useState(
    beneficiary?.birthDate ? beneficiary.birthDate.substring(0, 10) : ''
  );
  const [formGender, setFormGender] = useState<Gender>(beneficiary?.gender || 'MALE');
  const [formAddress, setFormAddress] = useState(beneficiary?.address || '');

  const updateMutation = useUpdateBeneficiary();

  function handleClose(nextOpen: boolean) {
    onOpenChange(nextOpen);
  }

  function handleUpdateBeneficiary() {
    if (!beneficiary) return;

    if (!formName.trim()) {
      toast.error('Preencha os campos obrigatórios (Nome)');
      return;
    }

    let cleanCpf: string | undefined = undefined;
    if (formCpf.trim()) {
      cleanCpf = formCpf.replace(/\D/g, '');
      if (cleanCpf.length !== 11) {
        toast.error('CPF deve conter 11 dígitos');
        return;
      }
    }

    updateMutation.mutate(
      {
        id: beneficiary.id,
        data: {
          fullName: formName,
          cpf: cleanCpf,
          email: formEmail || undefined,
          phone: formPhone || undefined,
          birthDate: formBirthDate || undefined,
          gender: formGender,
          address: formAddress || undefined,
        },
      },
      {
        onSuccess: () => {
          toast.success('Beneficiário atualizado com sucesso!');
          handleClose(false);
        },
        onError: (err) => {
          toast.error(err?.response?.data?.message || 'Erro ao atualizar beneficiário.');
        },
      }
    );
  }

  const isFormValid = !!formName.trim();

  return (
    <CreateModal
      open={open}
      onOpenChange={handleClose}
      title="Editar Beneficiário"
      description="Altere os dados desejados do beneficiário."
      onSubmit={handleUpdateBeneficiary}
      isSubmitting={updateMutation.isPending}
      submitLabel="Salvar"
      submitDisabled={!isFormValid}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="edit-name" className="text-xs text-muted-foreground font-medium">
            Nome Completo *
          </Label>
          <Input
            id="edit-name"
            placeholder="Digite o nome completo"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            className="bg-background border-input text-foreground text-sm"
            disabled={updateMutation.isPending}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="edit-cpf" className="text-xs text-muted-foreground font-medium">
            CPF
          </Label>
          <Input
            id="edit-cpf"
            placeholder="000.000.000-00"
            value={formCpf}
            onChange={(e) => setFormCpf(e.target.value)}
            className="bg-background border-input text-foreground text-sm"
            disabled={updateMutation.isPending}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="edit-birth" className="text-xs text-muted-foreground font-medium">
            Data de Nascimento
          </Label>
          <Input
            id="edit-birth"
            type="date"
            value={formBirthDate}
            onChange={(e) => setFormBirthDate(e.target.value)}
            className="bg-background border-input text-foreground text-sm"
            disabled={updateMutation.isPending}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="edit-gender" className="text-xs text-muted-foreground font-medium">
            Gênero *
          </Label>
          <Select
            value={formGender}
            onValueChange={(v) => v && setFormGender(v as Gender)}
            disabled={updateMutation.isPending}
          >
            <SelectTrigger
              id="edit-gender"
              className="bg-background border-input text-foreground text-sm"
            >
              <SelectValue placeholder="Selecionar">
                {formGender === 'MALE' ? 'Masculino' : 'Feminino'}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-card border border-border">
              <SelectItem value="MALE">Masculino</SelectItem>
              <SelectItem value="FEMALE">Feminino</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="edit-phone" className="text-xs text-muted-foreground font-medium">
            Telefone
          </Label>
          <Input
            id="edit-phone"
            placeholder="(00) 00000-0000"
            value={formPhone}
            onChange={(e) => setFormPhone(e.target.value)}
            className="bg-background border-input text-foreground text-sm"
            disabled={updateMutation.isPending}
          />
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="edit-email" className="text-xs text-muted-foreground font-medium">
            E-mail
          </Label>
          <Input
            id="edit-email"
            type="email"
            placeholder="exemplo@email.com"
            value={formEmail}
            onChange={(e) => setFormEmail(e.target.value)}
            className="bg-background border-input text-foreground text-sm"
            disabled={updateMutation.isPending}
          />
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="edit-address" className="text-xs text-muted-foreground font-medium">
            Endereço
          </Label>
          <Input
            id="edit-address"
            placeholder="Rua, número, bairro..."
            value={formAddress}
            onChange={(e) => setFormAddress(e.target.value)}
            className="bg-background border-input text-foreground text-sm"
            disabled={updateMutation.isPending}
          />
        </div>
      </div>
    </CreateModal>
  );
}
