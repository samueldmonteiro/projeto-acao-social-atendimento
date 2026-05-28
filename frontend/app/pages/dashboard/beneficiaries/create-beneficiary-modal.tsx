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
import { useCreateBeneficiary } from '@/hooks/queries/use-beneficiaries';
import type { Gender } from '@/types/beneficiary.type';

interface CreateBeneficiaryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateBeneficiaryModal({
  open,
  onOpenChange,
}: CreateBeneficiaryModalProps) {
  const [formName, setFormName] = useState('');
  const [formCpf, setFormCpf] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formBirthDate, setFormBirthDate] = useState('');
  const [formGender, setFormGender] = useState<Gender>('MALE');
  const [formAddress, setFormAddress] = useState('');

  const createMutation = useCreateBeneficiary();

  function handleClose(nextOpen: boolean) {
    if (!nextOpen) {
      setFormName('');
      setFormCpf('');
      setFormEmail('');
      setFormPhone('');
      setFormBirthDate('');
      setFormGender('MALE');
      setFormAddress('');
    }
    onOpenChange(nextOpen);
  }

  function handleCreateBeneficiary() {
    if (!formName.trim() || !formCpf.trim() || !formBirthDate) {
      toast.error('Preencha os campos obrigatórios (Nome, CPF e Data de Nascimento)');
      return;
    }

    const cleanCpf = formCpf.replace(/\D/g, '');
    if (cleanCpf.length !== 11) {
      toast.error('CPF deve conter 11 dígitos');
      return;
    }

    createMutation.mutate(
      {
        fullName: formName,
        cpf: cleanCpf,
        email: formEmail || undefined,
        phone: formPhone || undefined,
        birthDate: formBirthDate,
        gender: formGender,
        address: formAddress || undefined,
      },
      {
        onSuccess: () => {
          toast.success('Beneficiário cadastrado com sucesso!');
          handleClose(false);
        },
        onError: (err) => {
          toast.error(err?.response?.data?.message || 'Erro ao cadastrar beneficiário.');
        },
      }
    );
  }

  const isFormValid = !!formName.trim() && !!formCpf.trim() && !!formBirthDate;

  return (
    <CreateModal
      open={open}
      onOpenChange={handleClose}
      title="Cadastrar Novo Beneficiário"
      description="Preencha os dados do beneficiário. Nome, CPF e Data de Nascimento são campos obrigatórios."
      onSubmit={handleCreateBeneficiary}
      isSubmitting={createMutation.isPending}
      submitLabel="Cadastrar"
      submitDisabled={!isFormValid}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="create-name" className="text-xs text-muted-foreground font-medium">
            Nome Completo *
          </Label>
          <Input
            id="create-name"
            placeholder="Digite o nome completo"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            className="bg-background border-input text-foreground text-sm"
            disabled={createMutation.isPending}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="create-cpf" className="text-xs text-muted-foreground font-medium">
            CPF *
          </Label>
          <Input
            id="create-cpf"
            placeholder="000.000.000-00"
            value={formCpf}
            onChange={(e) => setFormCpf(e.target.value)}
            className="bg-background border-input text-foreground text-sm"
            disabled={createMutation.isPending}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="create-birth" className="text-xs text-muted-foreground font-medium">
            Data de Nascimento *
          </Label>
          <Input
            id="create-birth"
            type="date"
            value={formBirthDate}
            onChange={(e) => setFormBirthDate(e.target.value)}
            className="bg-background border-input text-foreground text-sm"
            disabled={createMutation.isPending}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="create-gender" className="text-xs text-muted-foreground font-medium">
            Gênero *
          </Label>
          <Select
            value={formGender}
            onValueChange={(v) => v && setFormGender(v as Gender)}
            disabled={createMutation.isPending}
          >
            <SelectTrigger
              id="create-gender"
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
          <Label htmlFor="create-phone" className="text-xs text-muted-foreground font-medium">
            Telefone
          </Label>
          <Input
            id="create-phone"
            placeholder="(00) 00000-0000"
            value={formPhone}
            onChange={(e) => setFormPhone(e.target.value)}
            className="bg-background border-input text-foreground text-sm"
            disabled={createMutation.isPending}
          />
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="create-email" className="text-xs text-muted-foreground font-medium">
            E-mail
          </Label>
          <Input
            id="create-email"
            type="email"
            placeholder="exemplo@email.com"
            value={formEmail}
            onChange={(e) => setFormEmail(e.target.value)}
            className="bg-background border-input text-foreground text-sm"
            disabled={createMutation.isPending}
          />
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="create-address" className="text-xs text-muted-foreground font-medium">
            Endereço
          </Label>
          <Input
            id="create-address"
            placeholder="Rua, número, bairro..."
            value={formAddress}
            onChange={(e) => setFormAddress(e.target.value)}
            className="bg-background border-input text-foreground text-sm"
            disabled={createMutation.isPending}
          />
        </div>
      </div>
    </CreateModal>
  );
}
